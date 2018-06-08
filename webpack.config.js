const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtreactPlugin = require('mini-css-extract-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const UglifyPlugin = require('webpack-parallel-uglify-plugin');
const HappyPack = require('happypack');
const os = require('os');

const threadPool = HappyPack.ThreadPool({size: os.cpus().length});

const BuildPlugins = [
  new UglifyPlugin({
    cacheDir: 'output/cache',
    uglifyES: {
      compress: {
        drop_debugger: true,
        pure_funcs: [
          // 禁用console.debug
          'console.debug',
        ],
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false,
      },
      output: {
        comments: false,
        // Turned on because emoji and regex is not minified properly using default
        // https://github.com/facebookincubator/create-react-app/issues/2488
        ascii_only: true,
      },
    },
    sourceMap: false,
  }),
];

getBuildPlugins = process.env.NODE_ENV === 'production' ? BuildPlugins : [];
getExternals = process.env.NODE_ENV === 'production' ? {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'history': 'History',
  'react-router-dom': 'ReactRouterDOM',
  'reactstrap': 'Reactstrap'
} : {};

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[hash:8].bundle.js',
    chunkFilename: '[name].[hash:8].chunk.js',
    path: path.resolve(__dirname, 'build')
  },
  externals: getExternals,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=jsx',
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
    new HappyPack({
      id: 'jsx',
      threadPool: threadPool,
      loaders: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }]
    }),
    new MonacoWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.ejs',
      inject: true
    }),
    new MiniCssExtreactPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id].[hash:8].css'
    })
  ]
};
