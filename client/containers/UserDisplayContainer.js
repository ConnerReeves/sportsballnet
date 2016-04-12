import React, { Component } from 'react';
import UserDisplay from '../components/UserDisplay';

export default class UserDisplayContainer extends Component {
  render() {
    return (
      <UserDisplay email="connerreeves@gmail.com" />
    );
  }
}
