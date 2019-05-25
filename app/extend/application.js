const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const APIS = Symbol('Application#apis');

module.exports = {
  get apis() {
    if(!this[APIS]) {
      const apisPath = path.join(__dirname, '../apis');
      const readDirs = fs.readdirSync(apisPath);
      let modules = {};

      readDirs.forEach(function(file){
        if(file !== 'index.js'){
          const fileInfo = fs.statSync(path.join(apisPath, file));
          if(fileInfo.isDirectory()){
            // do noting
          }else{
            const tempObj = require(path.join(apisPath, file));
            if(toString.call(tempObj) === '[object Object]'){
              modules = _.extend(modules, tempObj);
            }
          }
        }
      });
      
      this[APIS] = modules;
    }

    return this[APIS];
  }
}