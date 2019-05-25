/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const StartBackServerPlugin = require('../scripts/StartBackServerPlugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const pkg = require(path.resolve(process.cwd(), 'package.json'));
const getValue = require('lodash/get');

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new CircularDependencyPlugin({
    exclude: /a\.js|node_modules/,
    failOnError: false,
  }),
  new StartBackServerPlugin(),
  // new BundleAnalyzerPlugin()
];

module.exports = require('./webpack.base.babel')({
  mode: 'development',

  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'eventsource-polyfill',
      'webpack-dev-server/client?http://localhost:8100',
      'webpack/hot/only-dev-server',
      path.join(process.cwd(), 'client/modules/app/index.js')
    ],
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: getValue(pkg, ['assetUrl', process.env.NODE_ENV], '/mobile/statics/')
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: { // 将第三方模块提取出来
          test: /node_modules/,
          chunks: chunk => ['app', 'teacher', 'invite'].includes(chunk.name), //'initial',
          name: 'vendor',
          priority: 10, // 优先
          enforce: true
        }
      }
    }
  },

  plugins: plugins,

  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'source-map',

  performance: {
    hints: false,
  },

  module: process.env.LINT === 'true' ? {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        include: path.join(process.cwd(), 'client'),
        loader: 'eslint-loader',
        query: {
          cacheDirectory: true
        },
        exclude: [
          path.join(process.cwd(), 'client/vendors')
        ]
      }
    ]
  } : { rules: [] },

  devServer: {
    hot: true,
    historyApiFallback: true,
    host: 'localhost',
    port: 8100,
    proxy: {
      '/': {
        target: 'http://127.0.0.1:13810/',
        secure: false
      }
    },
    contentBase: './client/',
    publicPath: '/statics/',
    inline: true,
    disableHostCheck:true
  }
});


