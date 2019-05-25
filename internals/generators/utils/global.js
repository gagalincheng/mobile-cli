const fs = require('fs-extra');
const path = require('path');

function getModules(){
  const rootPath = path.join(__dirname, '../../../client/modules');
	return fs.readdirSync(rootPath);
}

function getPages(moduleName) {
  const rootPath = path.join(__dirname, `../../../client/modules/${ moduleName }/pages`);
  return fs.readdirSync(rootPath).filter(file => fs.statSync(path.join(rootPath, file)).isDirectory());
}

function getActions(moduleName){
	const actionPath = path.join(__dirname, `../../../client/modules/${ moduleName }/actions`);
	fs.ensureDirSync(actionPath);
	return fs.readdirSync(actionPath);
}

function getReducers(moduleName){
	const reducersPath = path.join(__dirname, `../../../client/modules/${ moduleName }/reducers`);

	fs.ensureDirSync(reducersPath);
	return fs.readdirSync(reducersPath);
}

// 判断文件名是否存在
function fileIsExist(filePath, fileName) {
  return fs.readdirSync(path.join(__dirname, '../' + filePath)).indexOf(fileName) > 0;
}

// 缩写字符串首字母
function lowerFirst(str) {
  return str.charAt(0).toLowerCase() + str.substring(1);
}

// 获取文件夹中的文件
function getFiles(module, type) {
  const rootPath = path.join(__dirname, `../../../client/modules/${ module }/${ type }s`);
  return fs.readdirSync(rootPath);
}

module.exports = {
  fileIsExist,
  getPages,
  getModules,
  lowerFirst,
  getFiles,
  getActions,
  getReducers
};
