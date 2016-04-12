import React, { Component, PropTypes } from 'react';
import Gravatar from 'react-gravatar';

export default class UserDisplay extends Component {
  render() {
    return (
      <div>
        <Gravatar email={ this.props.email } size={ 30 } />
      </div>
    );
  }
}
