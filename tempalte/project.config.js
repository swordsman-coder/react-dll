const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  env: NODE_ENV,
  basePath: __dirname,
  srcDir: path.resolve(__dirname, 'src'),
  outDir: path.resolve(__dirname, 'dist'),
  publicPath: NODE_ENV === 'development' ? './' : '/app/crm/dist/',
  esLint: false,
  vendor: ['react', 'react-dom', 'react-router-dom', 'react-loadable', 'mobx', 'mobx-react']
};
