import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        I am part of the wrapper
        { this.props.children }
      </div>
    );
  }
}
