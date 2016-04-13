import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUnregisteredUser } from '../actions/AppActions';
import { getUnregisteredUser } from '../reducers/AppReducer';
import Register from '../components/Register';

export class RegisterContainer extends Component {
  componentDidMount() {
    const userId = this.props.params.userId;
    if (userId) {
      this.props.fetchUnregisteredUser(userId);
    }
  }

  render() {
    return (
      <Register user={ this.props.user } />
    );
  }
}

const mapStateToProps = (state) => ({
  user: getUnregisteredUser(state)
});

const mapDispatchToProps = {
  fetchUnregisteredUser
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
