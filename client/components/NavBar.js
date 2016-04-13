import React, { Component } from 'react';
import { Link } from 'react-router';
require('../styles/nav-bar.scss');

export default class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <Link to="" className="app-logo" />
        <div className="route-links">
          <Link to="leagues">Leagues</Link>
        </div>
      </div>
    );
  }
}
