const fs = require('fs-extra')
const path = require('path');
const pkg = require(path.resolve(process.cwd(), 'package.json'));
const dllPlugin = pkg.dllPlugin;
const dllPath = path.join(process.cwd(), dllPlugin.path);

function getDlls(){
	const files = fs.readdirSync(dllPath)
	return files.filter(function(item){
		if(/\w*.dll.js/.test(item)){
			return true;
		}
	})
}

// 从构建的dll中同步
function syncDlls(){
	const assetHelper = require('./asset');
	const files = fs.readdirSync(dllPath)
	const dlls = files.filter(function(item){
		if(/\w*.dll.js/.test(item)){
			fs.copySync(path.join(process.cwd(), pkg.dllPlugin.path, item), path.join(pkg.asset.path, item))
			return true;
		}
	})

	assetHelper.setDlls(dlls).save();
}

module.exports = {
	getDlls: getDlls,
	syncDlls: syncDlls
}