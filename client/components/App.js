import React, { Component } from 'react';
import NavBar from './NavBar';
require('../styles/app.scss');

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar path={ this.props.path } />
        <div className="viewport">
          { this.props.children }
        </div>
      </div>
    );
  }
}
