import React, { Component } from 'react';
import { Link } from 'react-router';
require('../styles/nav-bar.scss');

export default class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <Link to="">
          <div className="app-logo" />
        </Link>
        <div className="route-links">
          <Link to="users">Users</Link>
          <Link to="leagues">Leagues</Link>
          <Link to="organizations">Organizations</Link>
        </div>
      </div>
    );
  }
}
