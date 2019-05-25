const path = require('path');

exports.keys = 'eggfirstkey';

exports.middleware = ['locals', 'notFoundHandler'];

exports.view = {
  defaultViewEngine: 'ejs',
  mapping: {
    '.ejs': 'ejs',
  },
};

exports.session = {
  key: 'connect.magick',
  maxAge: 86400000,
  httpOnly: true,
  renew: true
}


// 安全配置
exports.security = {
  csrf: {
    headerName: 'x-csrf-token'
  },
  xframe: {
    enable: false
  },
  domainWhiteList: ['.weixin.qq.com'],
};

exports.static = {
  prefix: '/statics/',
  dir: path.join(__dirname, '../', './build/statics')
};
