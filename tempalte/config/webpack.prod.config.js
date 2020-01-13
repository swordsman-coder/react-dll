const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const CssNaNo = require('cssnano');
const PostCssPresetEnv = require('postcss-preset-env');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const IncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const {
	basePath,
	srcDir,
	theme, publicPath, outDir, env
} = require('../project.config')
const glob = require('glob');
const base = require('./webpack.base.config')
const node_dir = path.join(__dirname, './node_modules/');
// 获取所有入口文件
const getEntry = function (globPath) {
	const entries = {};
	glob.sync(globPath).forEach((entry) => {
		let es = entry.replace('./src/view/', '')
		es = es.replace('/app.js', '/index.js')
		const pathname = es.split('/').splice(-10).join('/').split('.')[0];
		entries[pathname] = [entry];
	});
	console.log(entries);
	return entries;
};
const entries = getEntry('./src/view/**/app.js');
const entryArr = JSON.parse(JSON.stringify(entries));


for (const key in entryArr) {
	console.log('编译中', entryArr[key]);
}
const chunks = Object.keys(entries);
const production = {
	entry: entries,
	output: {
		publicPath,
		path: outDir
	},
	mode: 'production',
	devtool: false,
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								PostCssPresetEnv({
									browsers: ['> 1%', 'last 5 version', 'ie > 8']
								}),
								CssNaNo({
									reduceIdents: false,
									autoprefixer: false
								})
							]
						}
					},
					{
						loader: 'less-loader',
						options: {
							javascriptEnabled: true,
							paths: [srcDir],
							modifyVars: theme
						}
					}
				]
			}
		]
	},
	optimization: {
		minimize: true
		// sideEffects: false,
		// splitChunks: {
		// 	chunks: 'all',
		// 	minSize: 30000,
		// 	minChunks: 1,
		// 	cacheGroups: {
		// 		vendor: {
		// 			name: 'vendor',
		// 			test: /[\\/]node_modules[\\/]/,
		// 			chunks: 'all',
		// 			priority: -10,
		// 			enforce: true
		// 		}
		// 	}
		// }
	},
	plugins: [
		new webpack.DefinePlugin({
			__ENV__: JSON.stringify(env)
		}),

		new webpack.DllReferencePlugin({
			context: basePath,
			manifest: path.resolve(basePath, 'dll', 'manifest.json')
		}),
		new WebpackBar({
			minimal: false
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[chunkhash:5].css'
		}),
		new CopyWebpackPlugin([{
			from: path.join(basePath, 'routerMap'),
			to: path.join(basePath, 'dist', 'routerMap')
		}]),
		new CopyWebpackPlugin([{
			from: path.join(basePath, 'dll'),
			to: path.join(basePath, 'dist', 'dll')
		}]),
		new IncludeAssetsPlugin({
			assets: [{
				path: 'dll',
				glob: '*.js',
				globPath: path.join(basePath, 'dll')
			}],
			append: false
		})
	]
};

chunks.forEach((pathname) => {
	console.log(pathname)
	if (pathname == 'vendor') {
		return;
	}
	const conf = {
		filename: pathname + '.html',
		template: srcDir + '/index.html',
		inject: 'body',
		minify: {
			removeComments: true,
			collapseWhitespace: false
		}
	};
	if (pathname in entries) {
		conf.chunks = ['vendor', pathname];
		conf.hash = true;
	}

	production.plugins.unshift(new HtmlWebpackPlugin(conf));

});

module.exports = merge(base, production);
