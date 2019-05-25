import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import WechatMode from '@/wechat/mode/WechatMode';
import Page1 from './Page1';
import '../styles/index.less';

const pathPrefix = `${hostPrefix}wx`;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.wechatMode = new WechatMode(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={`${pathPrefix}`} component={ Index } />
          <Route path={`${pathPrefix}/page1`} component={ Page1 } />
        </Switch>
      </Router>
    );
  }
}

const withConnect = connect(null, null);

export default withRouter(withConnect(App));