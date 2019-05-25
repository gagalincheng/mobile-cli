import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory as createHistory } from 'history';
import { AppContainer } from 'react-hot-loader';
import App from './pages/index';
import 'babel-polyfill';
import configureStore from './configureStore';
import '../../vendors/lib-flexible/flexible.debug.js';
import '../../vendors/lib-flexible/flexible_css.debug.js';

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

function render(Component){
	ReactDOM.render(
    <Provider store={store}>
	    <ConnectedRouter history={history}>
        <AppContainer>
          <Component />
        </AppContainer>
      </ConnectedRouter>
	  </Provider>,
	  MOUNT_NODE
	);
}


render(App);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}

// if (process.env.NODE_ENV !== 'production') {
//   require('@/common/helpers/vconsole'); // eslint-disable-line global-require
// }

// hot load
if (module.hot) {
  module.hot.accept('./pages/index', () => { 
  	render(App);
  })
}