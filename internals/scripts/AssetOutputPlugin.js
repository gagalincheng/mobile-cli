'use strict'
var assetHelper = require('./helpers/asset');

function AssetOutputPlugin() {
  function emitHook (compilation, callback) {
    const stats = compilation.getStats().toJson({
      hash: true,
      publicPath: true,
      assets: true,
      chunks: false,
      modules: false,
      source: false,
      errorDetails: false,
      timings: false
    })

    const assetsByChunkName = stats.assetsByChunkName;
    assetHelper.setChunks(assetsByChunkName).save();
    console.log(JSON.stringify(assetsByChunkName));

    callback();
  }

  function apply (compiler) {
    if (compiler.hooks) {
      compiler.hooks.emit.tapAsync('AssetOutputPlugin', emitHook)
    } else {
      compiler.plugin('emit', emitHook)
    }
  }

  return { apply }
}

module.exports = AssetOutputPlugin;
