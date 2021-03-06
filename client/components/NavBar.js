import React, { Component } from 'react';
import { Link } from 'react-router';
require('../styles/nav-bar.scss');
const logoImg = require('../images/trophy-white.png');

export default class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <Link to="" className="app-logo">
          <img src={ logoImg } className="logo-img" />
        </Link>
        <div className="route-links">
          { this._getLink('/leagues', 'Leagues') }
        </div>
      </div>
    );
  }

  _getLink(path, title) {
    return (
      <Link
        to={ path }
        className={ this.props.path === path ? 'active' : '' }>
        { title }
      </Link>
    );
  }
}
