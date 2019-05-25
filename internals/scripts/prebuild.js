#!/usr/bin/env node

var fs = require('fs-extra');
var path = require('path');
var pkg = require(path.join(process.cwd(), 'package.json'));

module.exports = function(){
	try{
  	fs.statSync(pkg.asset.path);
	}catch(e){
	  fs.mkdirsSync(pkg.asset.path);
	}

	// copy dll到build项目
	var dllHelper = require('./helpers/dll');
	

	dllHelper.syncDlls();
}
