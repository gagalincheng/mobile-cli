const fs = require('fs');
const path = require('path');
const pageGenerator = require('./page/page');
const actionGenerator = require('./action/action');
const sectionGenerator = require('./section/section');
const serverGenerator = require('./server/server');
const componentGenerator = require('./component/component');

module.exports = (plop) => {
  plop.setGenerator('Page section', sectionGenerator);
  plop.setGenerator('Page', pageGenerator);
  plop.setGenerator('Component', componentGenerator);
  plop.setGenerator('Action & Reducer', actionGenerator);
  plop.setGenerator('Server api', serverGenerator);

  plop.addHelper('directory', (comp) => {
    try {
      fs.accessSync(path.join(__dirname, `../../client/app/pages/${comp}`), fs.F_OK);
      return `containers/${comp}`;
    } catch (e) {
      return `components/${comp}`;
    }
  });

  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
