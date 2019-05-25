'use strict'

var firstCompile = false;

function StartBackServerPlugin() {
  function emitHook(compilation, callback) {
    if(!firstCompile){
      process.send({ type: 'start-back-server' })
    }

    firstCompile = true;

    callback();
  }

  function apply(compiler) {
    if (compiler.hooks) {
      compiler.hooks.afterEmit.tapAsync('StartBackServerPlugin', emitHook)
    } else {
      compiler.plugin('after-emit', emitHook)
    }
  }

  return { apply }
}

module.exports = StartBackServerPlugin;
