/**
 * 页面子组件
 *
 */
'use strict';
const methods = require('../utils/global');

module.exports = {
  description: '新建一个page页面的子组件',
  // 提示
  prompts: [{
    type: 'list',
    name: 'module',
    message: '组件生成到哪个模块',
    default: 'app',
    choices: () => methods.getModules()
  }, {
    type: 'list',
    name: 'page',
    message: '组件生成到哪个页面',
    choices: (data) => methods.getPages(data.module)
  }, {
    type: 'input',
    name: 'fileName',
    message: '组件的名称',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true;
      }

      return '你可以没有名称，但是这个组件需要';
    }
  }],
  actions: (data) => {
    const rootPath = `../../client/modules/${ data.module }/pages/${ data.page }`;
    const template = './template/component.js.hbs';

    if (methods.fileIsExist(rootPath, data.fileName)){
      throw new Error('文件名称已经存在');
    }

    const actions = [{
      type: 'add',
      path: `${ rootPath }/${ data.fileName }/index.js`,
      templateFile: template,
      abortOnFail: true,
      data: {
        fileName: data.fileName,
        actionName: methods.lowerFirst(data.page)
      }
    }];

    return actions;
  },
};
