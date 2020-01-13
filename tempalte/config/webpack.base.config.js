const webpack = require('webpack');
const path = require('path');

const ESLintFormatter = require('eslint-friendly-formatter');
const {
  env,
  esLint,
  basePath,
  srcDir,
  publicPath,
  outDir
} = require('../project.config');

const fonts = [
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['svg', 'image/svg+xml'],
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2']
];

const ESLintRule = () => ({
  test: /(\.jsx|\.js)$/,
  use: {
    loader: 'eslint-loader?cacheDirectory',
    options: {
      formatter: ESLintFormatter
    }
  },
  enforce: 'pre',
  include: srcDir,
  exclude: /node_modules/
});

const base = {
  entry: {
    main: ['@babel/polyfill', `${srcDir}/App.jsx`]
  },
  output: {
    publicPath,
    path: outDir
  },
  resolve: {
    alias: {
      '@': srcDir
    },
    modules: [srcDir, 'node_modules'],
    extensions: ['.js', '.jsx', '.json', '.less', '.css']
  },
  module: {
    rules: [
      ...(esLint ? [ESLintRule()] : []),
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader?cacheDirectory'
        },
        include: srcDir,
        exclude: /node_modules/
      },
      {
        test: /\.(png|PNG|jpe?g|JPG|gif|GIF)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[hash:5].[ext]'
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'media/[name].[hash:5].[ext]'
          }
        }
      },
      ...(() => {
        const rules = [];
        fonts.forEach((item) => {
          rules.push({
            test: new RegExp(`\\.${item[0]}$`),
            use: {
              loader: 'url-loader',
              options: {
                name: 'fonts/[name].[hash:5].[ext]',
                limit: 10000,
                mimetype: item[1]
              }
            }
          });
        });
        return rules;
      })()
    ]
  },
  performance: {
    hints: false
  },
  plugins: [

  ]
};

module.exports = base;
