import React, { Component } from 'react';
import { Input, ButtonInput } from 'react-bootstrap';
require('../styles/auth.scss');

export default class Login extends Component {
  render() {
    return (
      <div className="login-wrapper">
        <form className="login-form" method="POST" action="/login">
          <Input
            type="email"
            label="Email"
            name="username"
          />
          <Input
            type="password"
            label="Password"
            name="password"
          />
          <ButtonInput
            className="login-button"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    );
  }
}
