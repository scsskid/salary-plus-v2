const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  
  devServer: {
    host: '0.0.0.0',
    https: false,
    open: false,
    historyApiFallback: true,
    contentBase: './dist',
    hot: false,
    clientLogLevel: 'warning',
    compress: true,
    writeToDisk: true
  }
});
