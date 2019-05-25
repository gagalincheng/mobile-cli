const fs = require('fs-extra');
const prettier  = require('prettier');

class Constant {
	constructor(filePath) {
		this.filePath = filePath;
		this.init(filePath);
		this.constants = fs.readFileSync(filePath, 'utf8');
  }

  init(filePath){
  	fs.ensureFileSync(filePath);
  }

  add(constString){
  	const template = `export const ${ constString } = '${ constString }'`
  	this.constants = this.constants + template;
    return this;
  }

  save(){
  	fs.outputFileSync(this.filePath, prettier.format(this.constants, { singleQuote: true }))
    return this;
  }
}

module.exports = Constant;
