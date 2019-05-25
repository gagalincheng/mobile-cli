'use strict';
const methods = require('../utils/global');

module.exports = {
  description: '新建一个页面',
  // 提示
  prompts: [{
    type: 'list',
    name: 'module',
    message: '页面生成到哪个模块',
    default: 'app',
    choices: () => methods.getModules(),
  }, {
    type: 'input',
    name: 'pageName',
    message: '页面的名称',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true;
      }

      return '你可以没有名称，但是这个page需要';
    }
  }, {
    type: 'confirm',
    name: 'createActions',
    default: true,
    message: '是否需要生成actions文件',
  }, {
    type: 'confirm',
    name: 'hasComponent',
    default: true,
    message: '是否需要生成页面子组件',
  }, {
    type: 'input',
    name: 'componentName',
    message: '输入组件名称',
    when: (data) => {
      if (data.hasComponent) {
        return true;
      }
      return false;
    }
  }],
  actions: (data) => {
    const pageTemplate = './template/page.js.hbs';

    const pagesPath = `../../client/modules/${ data.module }/pages`;

    if(methods.fileIsExist(pagesPath, data.pageName)){
      throw new Error('页面名称已经存在');
    }

    // properCase name -> 代表从命令行输入的name值
    const actions = [{
      type: 'add',
      path: `${ pagesPath }/${ data.pageName }/index.js`,
      templateFile: pageTemplate,
      abortOnFail: true,
      data: {
        pageName: data.pageName,
        componentName: data.componentName
      }
    }];

    // 处理首字母小写
    const fileName = methods.lowerFirst(data.pageName);

    // 生成action文件
    if (data.createActions) {
      const actionsTemplate = './template/actions.js.hbs';
      const reducersTemplate = './template/reducers.js.hbs';
      const rootPath = `../../client/modules/${ data.module }`;

      actions.push({
        type: 'add',
        path: `${ rootPath }/actions/${ fileName }.js`,
        templateFile: actionsTemplate,
        abortOnFail: true,
        data: {
          fileName
        }
      }, {
        type: 'add',
        path: `${ rootPath }/reducers/${ fileName }.js`,
        templateFile: reducersTemplate,
        abortOnFail: true,
        data: {
          fileName
        }
      });
    }

    // 如果需要生成子组件
    if (data.hasComponent) {
      const componentTemplate = './template/component.js.hbs';
      actions.push({
        type: 'add',
        path: `${ pagesPath }/${ data.pageName }/${ data.componentName }/index.js`,
        templateFile: componentTemplate,
        abortOnFail: true,
        data: {
          fileName: data.componentName
        }
      });
    }

    return actions;
  },
};
