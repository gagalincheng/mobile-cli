const getValue = require('lodash/get');
const path = require('path');

module.exports = appInfo => {
  const config = {};

  config.hostPrefix = getValue(appInfo.pkg, 'hostPrefix');

  config.baseUrl = '';

  config.logger = {
    dir: path.join(appInfo.baseDir, 'logs', appInfo.name),
    disableConsoleAfterReady: false  //开启终端日志打印
  };

  return config;
};

