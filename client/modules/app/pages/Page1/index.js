import React, { Component } from 'react';
import { connect } from 'react-redux';

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
      Hello World
      </div>
    );
  }
}

const withConnect = connect(null, null);

export default withConnect(Index);
