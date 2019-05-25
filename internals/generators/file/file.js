/**
 * 生成文件
 *
 */
'use strict';

const methods = require('../utils/global');
const prettier  = require('prettier');
const handlebars  = require('handlebars');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: '生成和更新',
  // 提示
  prompts: [{
    type: 'list',
    name: 'fileType',
    message: '文件类型',
    default: 'action',
    choices: () => ['action', 'reducer'],
  }, {
    type: 'list',
    name: 'chooseType',
    message: '类型',
    default: 'update',
    choices: () => ['create', 'update'],
    when: (data) => {
      if (data.fileType === 'action') {
        return true;
      }
      return false;
    }
  }, {
    type: 'list',
    name: 'module',
    message: '哪个模块',
    default: 'app',
    choices: () => methods.getModules()
  }, {
    type: 'input',
    name: 'fileName',
    message: '文件的名称',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true;
      }

      return '你可以没有名称，但是这个file需要';
    },
    when: data => {
      if (data.chooseType === 'create' || data.fileType === 'reducer') {
        return true;
      }
      return false;
    }
  }, {
    type: 'list',
    name: 'chooseName',
    message: '文件名',
    default: 0,
    choices: (data) => methods.getFiles(data.module, data.fileType),
    when: data => {
      if (data.chooseType === 'update') {
        return true;
      }
      return false;
    }
  }, {
    type: 'input',
    name: 'actionName',
    message: 'action名称',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true;
      }

      return '你可以没有名称，但是这个action需要';
    },
    when: data => {
      if (data.chooseType === 'update') {
        return true;
      }
      return false;
    }
  }, {
    type: 'list',
    name: 'actionType',
    message: 'action的类型',
    default: 'normal',
    choices: () => ['normal', 'dispatch'],
    when: data => {
      if (data.chooseType === 'update') {
        return true;
      }
      return false;
    }
  }],
  actions: (data) => {
    const actions = [];
    const rootPath =  `../../../client/modules/${ data.module }`;
    const actionsPath = rootPath + '/actions';
    const reducersPath = rootPath + '/reducers';

    if (data.chooseType === 'create') {
      // 生成文件
      if (data.fileType == 'action') {
        if (methods.fileIsExist(actionsPath, data.fileName)){
          throw new Error('文件名称已经存在');
        }
        const actionsTemplate = './template/actions.js.hbs';

        actions.push({
          type: 'add',
          path: `${ rootPath }/actions/${ data.fileName }.js`,
          templateFile: actionsTemplate,
          abortOnFail: true,
          data: {
            fileName
          }
        });
      } else {
        if (methods.fileIsExist(reducersPath, data.fileName)){
          throw new Error('文件名称已经存在');
        }
        const reducersTemplate = './template/reducers.js.hbs';

        actions.push({
          type: 'add',
          path: `${ rootPath }/reducers/${ fileName }.js`,
          templateFile: reducersTemplate,
          abortOnFail: true,
          data: {
            fileName
          }
        });
      }
    } else {
      // 修改已有文件
      let filePath = rootPath + `/actions/${ data.chooseName }`;
      let fileStr = prettier.format(fs.readFileSync(path.join(__dirname, filePath), 'utf8'));
      const template = fs.readFileSync(path.join(__dirname, '../template/actions.content.js.hbs'), 'utf8');
      const actionTypeStr = data.actionName.replace(/[A-Z]/g, (code) => {
        return '_' + code;
      });
      const contentData = {
        actionName: data.actionName,
        actionType: actionTypeStr.toUpperCase(),
        isDispatch: data.actionType === 'dispatch',
        isNormal: data.actionType === 'normal'
      };
      const contentStr = handlebars.compile(template)(contentData);
      fileStr += contentStr;
      // prettier.format 格式化文件空格
      fs.writeFileSync(path.join(__dirname, filePath), prettier.format(fileStr, { singleQuote: true }));
    }
    return actions;
  },
};
