import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from '../components/App';

export class AppContainer extends Component {
  render() {
    return (
      <App children={ this.props.children } />
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
