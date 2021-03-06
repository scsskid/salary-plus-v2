const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  target: 'web',
  entry: {
    main: './src/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },

      {
        test: /\.svg$/,
        use: {
          loader: '@svgr/webpack',
          options: {
            dimensions: false
          }
        }
      }
    ]
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/icons',
          to: 'icons'
        },
        {
          from: 'src/splashscreens',
          to: 'splashscreens'
        },
        {
          from: 'src/webrootfiles'
        }
      ]
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    new HtmlWebPackPlugin({ template: 'src/index.html' })
  ]
};
