'use strict';

const fs = require('fs');
const path = require('path');
const webpackConfigs = fs.readdirSync(path.join(process.cwd(), './internals/webpack'));
const defaultConfig = 'dev';

const configMap = {
	'development': 'dev',
  'beta': 'production',
  'test': 'production',
	'production': 'production'
}

const requestedConfigName = 'webpack.' + (configMap[process.env.NODE_ENV] || defaultConfig) + '.babel.js';

let LoadedConfig;

if (webpackConfigs.indexOf(requestedConfigName) !== -1) {
  LoadedConfig = require(path.join(process.cwd(), `/internals/webpack/${ requestedConfigName }`));
} else {
  throw new Error('can not find webpack config')
}

module.exports = LoadedConfig;