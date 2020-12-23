const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
  const mode = argv.mode;

  return {
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
      host: '0.0.0.0',
      https: false,
      open: false,
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'dist'),
      hot: false,
      clientLogLevel: 'warning',
      compress: true,
      writeToDisk: true
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
            mode === 'production'
              ? MiniCssExtractPlugin.loader
              : MiniCssExtractPlugin.loader,
            // : 'style-loader',
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
    optimization: {
      minimize: true,
      minimizer: [new CssMinimizerPlugin()]
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
        // filename: 'main.[contenthash].css'
        filename: 'main.css' // not caching until figrued out how to cache hashed with service worker (via workbox)
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
      })
    ]
  };
};
