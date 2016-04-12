import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <form action="api/users" method="post">
        <div>
          <label>Email:</label>
          <input type="text" name="email"/><br/>
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name"/><br/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password"/>
        </div>
          <div>
          <input type="submit" value="Submit"/>
        </div>
      </form>
    );
  }
}
