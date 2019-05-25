const fs = require('fs-extra');
const path = require('path');
const prettier  = require('prettier');
const handlebars  = require('handlebars');

class ReducerClass {
	constructor(filePath) {
		this.filePath = filePath;
		this.init(filePath);
		this.reducers = fs.readFileSync(filePath, 'utf8');
  }

  init(filePath){
    try{
      fs.statSync(filePath)
    }catch(e){
      console.log(e.message, `, then create reducer: ${filePath}`);
      const reducerFileTemplate = fs.readFileSync(path.join(__dirname, '../template/reducer.js.hbs'), 'utf8');
      fs.outputFileSync(filePath, handlebars.compile(reducerFileTemplate)({
        reducerName: path.basename(filePath, '.js')
      }));
      // 同时把reduer引入到reducer中
      this.joinReduer();
    }
  }

  // 合并reducers到combineReducers
  joinReduer(){
    const reducerFileTemplate = fs.readFileSync(path.join(__dirname, '../template/reducer.combine.js.hbs'), 'utf8');
    const reducersPath = path.join(this.filePath, '../');
    const reducerCombineFilePath = path.join(this.filePath, '../../reducers.js');

    const reducersFiles = fs.readdirSync(reducersPath);

    const reducers = reducersFiles.map(function(item){
      return {
        name: path.basename(item, '.js')
      }
    })

    const result = handlebars.compile(reducerFileTemplate)({reducers: reducers});
    fs.outputFileSync(reducerCombineFilePath, prettier.format(result, { singleQuote: true }));

  }

  add(actionType){
  	const template = `case types.${ actionType }: \n`;
    const inserIndex = this.reducers.indexOf('default:');
  	this.reducers = this.reducers.slice(0, inserIndex) + template + this.reducers.slice(inserIndex);
    return this;
  }

  save(){
  	fs.outputFileSync(this.filePath, prettier.format(this.reducers, { singleQuote: true }))
    return this;
  }
}

module.exports = ReducerClass;
