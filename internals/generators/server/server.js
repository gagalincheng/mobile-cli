/**
 * node端 apis
 *
 */
'use strict';
const methods = require('../utils/global');

module.exports = {
  description: '新建一个node api文件',
  // 提示
  prompts: [{
    type: 'input',
    name: 'fileName',
    message: '文件的名称',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true;
      }

      return '你可以没有名称，但是这个file需要';
    }
  }],
  actions: (data) => {
    const rootPath = `../../server/apis`;
    const template = './template/api.js.hbs';

    if (methods.fileIsExist(rootPath, data.fileName)){
      throw new Error('文件名称已经存在');
    }

    const actions = [{
      type: 'add',
      path: `${ rootPath }/${ data.fileName }.js`,
      templateFile: template,
      abortOnFail: true,
      data: {
        fileName: data.fileName
      }
    }];

    return actions;
  },
};
