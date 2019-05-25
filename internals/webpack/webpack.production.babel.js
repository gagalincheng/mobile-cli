// Important modules this config uses
const path = require('path');
const { HashedModuleIdsPlugin } = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const pkg = require(path.resolve(process.cwd(), 'package.json'));
const getValue = require('lodash/get');

const plugins = [
  new HashedModuleIdsPlugin({
    hashFunction: 'sha256',
    hashDigest: 'hex',
    hashDigestLength: 20,
  }),
];

module.exports = require('./webpack.base.babel')({
  mode: 'production',

  devtool: false,

  entry: {
    app: [
      path.join(process.cwd(), 'client/modules/app/index.js')
    ],
  },

  output: {
    publicPath: getValue(pkg, ['assetUrl', process.env.NODE_ENV], 'https://s0.seewo.com/cloud-static/school/web/dist/statics/'),
    filename: '[name].[contenthash].chunk.js',
    chunkFilename: '[name].[contenthash].chunk.js',
  },

  optimization:{
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            inline: false
          },
          mangle: {
            //处理移动端网页在iOS10上因为变量重复声明导致页面白屏的问题
            safari10: true
          }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendor: { // 将第三方模块提取出来
          test: /node_modules/,
          chunks: chunk=>['app', 'teacher', 'invite'].includes(chunk.name), //'initial',
          name: 'vendor',
          priority: 10, // 优先
          enforce: true
        }
      }
    }
  },

  plugins: plugins,

  performance: {
    assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
  }
});
