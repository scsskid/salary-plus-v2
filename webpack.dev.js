const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',

  devServer: {
    host: '0.0.0.0',
    open: false,
    historyApiFallback: true,
    contentBase: ['./src', './dist'],
    hot: true,
    inline: true,
    clientLogLevel: 'warning',
    compress: true,
    writeToDisk: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1, sourceMap: true }
          },
          { loader: 'postcss-loader', options: { sourceMap: true } }
        ]
      }
    ]
  }
});
