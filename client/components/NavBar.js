import React, { Component } from 'react';
import { Link } from 'react-router';
import UserDisplayContainer from '../containers/UserDisplayContainer';
require('../styles/nav-bar.scss');

export default class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <Link to="" className="app-logo" />
        <div className="route-links">
          <Link to="newgame">New Game</Link>
          <Link to="leaderboard">Leader Board</Link>
        </div>
        <div className="user-display">
          <UserDisplayContainer />
        </div>
      </div>
    );
  }
}
