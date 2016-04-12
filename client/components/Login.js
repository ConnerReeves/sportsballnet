import React, { Component } from 'react';
require('../styles/login.scss');

export default class Login extends Component {
  render() {
    return (
      <div className="login-wrapper">
        <form className="login-form" action="/login" method="post">
          <div>
            <label>Email:</label>
            <input type="text" name="username" className="form-input" /><br/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" className="form-input" />
          </div>
            <div>
            <input type="submit" value="Submit"/>
          </div>
        </form>
      </div>
    );
  }
}
