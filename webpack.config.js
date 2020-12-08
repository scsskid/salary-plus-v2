const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: './src/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    https: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    open: false,
    hot: true,
    clientLogLevel: 'warning'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }]
      },
      {
        test: /\.css$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1, sourceMap: true }
          },
          { loader: 'postcss-loader', options: { sourceMap: true } }
        ]
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
    new WriteFilePlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash].css'
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};
