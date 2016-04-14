import React, { Component } from 'react';
import { Input, ButtonInput } from 'react-bootstrap';
require('../styles/auth.scss');

export default class Register extends Component {
  render() {
    const unregisteredUser = this.props.user;

    return (
      <div className="register-wrapper">
        <form className="register-form" method="POST" action={ `/register/${ unregisteredUser && unregisteredUser.get('_id') }` }>
          <Input
            type="email"
            label="Email"
            name="username"
            value={ unregisteredUser && unregisteredUser.get('email') || '' }
            disabled={ Boolean(unregisteredUser) }
          />
          <Input
            type="text"
            label="Name"
            name="name"
            value={ unregisteredUser && unregisteredUser.get('name') || '' }
            disabled={ Boolean(unregisteredUser) }
          />
          <Input
            type="password"
            label="Password"
            name="password"
          />
          <ButtonInput
            className="login-button"
            type="submit"
            value="Register"
          />
        </form>
      </div>
    );
  }
}
