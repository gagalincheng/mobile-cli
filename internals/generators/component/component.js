/**
 * 生成组件
 *
 */
'use strict';

const methods = require('../utils/global');

module.exports = {
  description: '新建一个Component',
  // 提示
  prompts: [{
    type: 'list',
    name: 'module',
    message: '组件生成到哪个模块',
    default: 'app',
    choices: () => methods.getModules()
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
    const componentPath = `../../client/modules/${data.module}`;
    const componentTemplate = './template/uiComponent.js.hbs';

    const actions = [{
      type: 'add',
      path: `${ componentPath }/components/${ data.fileName }/index.js`,
      templateFile: componentTemplate,
      abortOnFail: true,
      data: {
        fileName: data.fileName
      }
    }];


    return actions;
  },
};
