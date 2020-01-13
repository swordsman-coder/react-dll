const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const IncludeAssetsPlugin = require('html-webpack-include-assets-plugin');


const base = require('./webpack.base.config');
const {
  srcDir,
  theme,
  env,
  basePath
} = require('../project.config');

const development = {
  entry: {
    main: ['webpack-hot-middleware/client?path=./__webpack_hmr']
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /(\.less|\.css)$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            paths: [srcDir],
            modifyVars: theme
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(env)
    }),

    new webpack.DllReferencePlugin({
      context: basePath,
      manifest: path.resolve(basePath, 'dll', 'manifest.json')
    }),

    new HtmlWebpackPlugin({
      template: `${srcDir}/index.html`,
      inject: true,
      // favicon: path.resolve('favicon.ico'),
      minify: {
        collapseWhitespace: true
      }
    }),
    new IncludeAssetsPlugin({
      assets: [{
        path: 'dll',
        glob: '*.js',
        globPath: path.join(basePath, 'dll')
      }],
      append: false
    }),
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = merge(base, development);
