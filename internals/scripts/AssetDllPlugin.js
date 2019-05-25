'use strict'
var assetHelper = require('./helpers/asset');

function AssetDllPlugin() {
  function emitHook(compilation, callback) {
    const assets = Object.keys(compilation.assets);
    assetHelper.setDlls(assets).save();

    callback();
  }

  function apply(compiler) {
    if (compiler.hooks) {
      compiler.hooks.emit.tapAsync('AssetDllPlugin', emitHook)
    } else {
      compiler.plugin('emit', emitHook)
    }
  }

  return { apply }
}

module.exports = AssetDllPlugin;
