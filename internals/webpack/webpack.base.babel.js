/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const getValue = require('lodash/get');
const webpack = require('webpack');
const pkg = require(path.resolve(process.cwd(), 'package.json'));
const px2rem = require('postcss-px2rem');
const autoprefixer = require('autoprefixer');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const AssetOutputPlugin = require('../scripts/AssetOutputPlugin');

process.noDeprecation = true;

function buildModule(options) {

  const imageLoader = [];
  const urlLoader = {
    loader: 'url-loader',
    options: {
      limit: 10000,
      publicPath: getValue(pkg, ['assetUrl', process.env.NODE_ENV], '/mobile/statics/')
    },
  }

  // const optLoader = {
  //   loader: 'image-webpack-loader',
  //   options: {
  //     progressive: true,
  //     optimizationLevel: 7,
  //     interlaced: false,
  //     pngquant: {
  //       quality: '65-90',
  //       speed: 4,
  //     },
  //   },
  // }

  imageLoader.push(urlLoader);

  // if (process.env.IMG_OPT) {
  //   imageLoader.push(optLoader);
  // }

  console.log(imageLoader);

  const defaultOptions = {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        test: /\.js$/,
        include: path.join(process.cwd(), 'node_modules/koa-compose'),
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        test: /\.js$/,
        include: /node_modules\/((dom7|swiper)\/).*/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: [
              autoprefixer,
              px2rem({ remUnit: 37.5 })
            ]
          }
        }, 'less-loader', {
          loader: 'style-resources-loader',
          options: {
            patterns: [
              path.join(process.cwd(), 'client/modules/common/styles/retina.less')
            ],
            injector: 'append'
          }
        }],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
               publicPath: 'statics/'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        include: /asset[\/\\]svgs/,
        loader: 'svg-sprite-loader',
      },
      {
        test: /\.svg$/,
        exclude: /(asset[\/\\]svgs)/,
        loader: imageLoader,
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: imageLoader
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ]
  }

  if (options.module) {
    return { rules: defaultOptions.rules.concat(options.module.rules) }
  }

  return defaultOptions;
}

module.exports = (options) => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign({
    path: path.join(process.cwd(), './build/statics'),
  }, options.output),
  module: buildModule(options),
  optimization: options.optimization,
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
      $: 'jquery',
      jQuery: 'jquery'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
    new AssetOutputPlugin(),
    new SpriteLoaderPlugin(),
  ]),
  resolve: {
    alias: {
      '@/app': path.join(process.cwd(), 'client/modules/app'),
      '@/common': path.join(process.cwd(), 'client/modules/common'),
      '@/asset': path.join(process.cwd(), 'client/asset'),
      '@/svg': path.join(process.cwd(), 'client/asset/svgs'),
      'moment$': 'moment/moment',
      'react-image-crop': 'react-image-crop/index.js',
      'nervjs': '@cvte/nerv-konva'
    },
    modules: ['client', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
  devtool: options.devtool,
  target: 'web',
  performance: options.performance || {},
  devServer: options.devServer || {}
});
