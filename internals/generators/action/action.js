/**
 * Container Generator
 */
const path = require('path');
const fs = require('fs-extra');
const prettier  = require('prettier');
const handlebars  = require('handlebars');
const methods = require('../utils/global');
const Constant = require('../libs/constant');
const ReducerClass = require('../libs/reducer');

module.exports = {
  description: 'Add a action',
  prompts: [{
    type: 'list',
    name: 'module',
    message: 'Select a module',
    default: 'app',
    choices: () => methods.getModules(),
  }, {
    type: 'list',
    name: 'name',
    message: 'Select or create a action:',
    choices: (props) => {
      // 支持在现有的actions中添加，或者新建一个
      var actions = ['create a action'];
      var currentActions = methods.getActions(props.module);
      return actions.concat(currentActions);
    }
  }, {
    type: 'input',
    name: 'newActionFileName',
    message: 'What should a action file be called?',
    default: 'default',
    when: (props) => {
      return props.name === 'create a action';
    },
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true;
      }
      return 'The name is required';
    }
  }, {
    type: 'list',
    name: 'type',
    message: 'Select a action type',
    default: 'normal',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true;
      }
      return 'The type is required';
    },
    choices: () => ['normal', 'dispatch'],
  }, {
    type: 'input',
    name: 'actionName',
    message: 'What should a action function be called?',
    default: 'defaultAction',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true;
      }
      return 'The name is required';
    }
  }, {
    type: 'input',
    name: 'actionType',
    message: 'what shuld a action type called?',
    when: (props) => {
      return props.type === 'normal';
    },
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true;
      }
      return 'The actionType is required';
    }
  }, {
    type: 'list',
    name: 'reducerFileName',
    message: 'choose or create a reducer file',
    when: (props) => {
      return props.type === 'normal';
    },
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true;
      }
      return 'The reducerFileName is required';
    },
    choices: (props) => {
      // 支持在现有的actions中添加，或者新建一个
      var actions = ['create a reducer'];
      var currentReducers = methods.getReducers(props.module);
      return actions.concat(currentReducers);
    }
  }, {
    type: 'input',
    name: 'reducerNewFileName',
    message: 'what should a new reducer file called?',
    when: (props) => {
      return props.reducerFileName === 'create a reducer';
    },
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true;
      }
      return 'The reducerFileName is required';
    }
  }],
  actions: (data) => {
    // 初始化一些数据
    const name = data.name === 'create a action' ? (data.newActionFileName + '.js') : data.name;

    data.fileName = name;
    data.isNormal = data.type === 'normal';
    data.isDispatch = data.type === 'dispatch';

    if(data.actionType){
      data.actionType = data.actionType.toUpperCase();
    }

    // 定义文件路径
    const actionsPath = path.join(__dirname, `../../../client/modules/${ data.module }/actions/${ name }`);

    // 如果文件不存在就创建一个
    if(data.name === 'create a action'){
      const actionTemplate = fs.readFileSync(path.join(__dirname, '../template/actions.js.hbs'), 'utf8')
      fs.outputFileSync(actionsPath, handlebars.compile(actionTemplate)(data));
    }

    let actionFileString = prettier.format(fs.readFileSync(actionsPath, 'utf8'));

    const actionContentTemplate = fs.readFileSync(path.join(__dirname, '../template/actions.content.js.hbs'), 'utf8')

    actionContentString = handlebars.compile(actionContentTemplate)(data);

    actionFileString = actionFileString + actionContentString;

    fs.outputFileSync(actionsPath, prettier.format(actionFileString, { singleQuote: true }));

    // 处理constants
    const contantPath = path.join(__dirname, `../../../client/modules/${ data.module }/constants/actionTypes.js`);
    if(data.actionType) {
      (new Constant(contantPath)).add(data.actionType).save();
    }

    // 处理reducer
    if(data.isNormal){
      const reduerName = (data.reducerFileName === 'create a reducer') ? (data.reducerNewFileName + '.js') : data.reducerFileName;
      const reduerPath = path.join(__dirname, `../../../client/modules/${ data.module }/reducers/${ reduerName }`);
      console.log(reduerPath);
      (new ReducerClass(reduerPath)).add(data.actionType).save();
    }

    return [];
  },
};
