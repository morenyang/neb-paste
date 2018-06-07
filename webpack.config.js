const webpack = require('webpack');
const path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtreactPlugin = require('mini-css-extract-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const BuildPlugins = [
  new UglifyJSPlugin(),
];

getBuildPlugins = process.env.NODE_ENV === 'production' ? BuildPlugins : [];

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[hash:8].bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtreactPlugin.loader,
          {loader: 'css-loader'},
          'postcss-loader'
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtreactPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]_[local]_[hash:base64:6]',
              camelCase: true
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              errLogToConsole: true,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...getBuildPlugins,
    new MonacoWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtreactPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id].[hash:8].css'
    })
  ]
};
