import React, { Component } from 'react';
import { Input, ButtonInput } from 'react-bootstrap';
require('../styles/login.scss');

export default class Login extends Component {
  render() {
    return (
      <div className="login-wrapper">
        <form className="login-form" onSubmit={ this._onFormSubmit.bind(this) }>
          <Input
            width={ 200 }
            type="email"
            label="Email"
            ref="username"
          />
          <Input
            width={ 200 }
            type="password"
            label="Password"
            ref="password"
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

  _onFormSubmit() {
    this.props.login({
      username: this.refs.username.getValue(),
      password: this.refs.username.getValue()
    });
  }
}
