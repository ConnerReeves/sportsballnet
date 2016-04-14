import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions/AppActions';
import App from '../components/App';

export class AppContainer extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    return (
      <App
        children={ this.props.children }
        path={ this.props.location.pathname }
      />
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  fetchCurrentUser
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
