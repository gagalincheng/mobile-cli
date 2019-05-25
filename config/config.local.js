const getValue = require('lodash/get');

module.exports = appInfo => {
  const config = {};

  config.hostPrefix = getValue(appInfo.pkg, 'hostPrefix');

  config.baseUrl = '';

  return config;
};

