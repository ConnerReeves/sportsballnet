import React, { Component } from 'react';
import { Input, ButtonInput } from 'react-bootstrap';
require('../styles/login.scss');

export default class Register extends Component {
  render() {
    const unregisteredUser = this.props.user;

    return (
      <div className="login-wrapper">
        <form className="login-form" method="POST" action={ `/register/${ unregisteredUser && unregisteredUser.get('_id') }` }>
          <Input
            width={ 300 }
            type="email"
            label="Email"
            name="username"
            value={ unregisteredUser && unregisteredUser.get('email') || '' }
            disabled={ Boolean(unregisteredUser) }
          />
          <Input
            width={ 300 }
            type="text"
            label="Name"
            name="name"
            value={ unregisteredUser && unregisteredUser.get('name') || '' }
            disabled={ Boolean(unregisteredUser) }
          />
          <Input
            width={ 300 }
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
