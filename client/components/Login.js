import React, { Component } from 'react';
import { Input, ButtonInput } from 'react-bootstrap';
require('../styles/login.scss');

export default class Login extends Component {
  render() {
    return (
      <div className="login-wrapper">
        <form className="login-form" method="POST" action="/login">
          <Input
            width={ 200 }
            type="email"
            label="Email"
            name="username"
          />
          <Input
            width={ 200 }
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
