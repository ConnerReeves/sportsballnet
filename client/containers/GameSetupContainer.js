import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../reducers/AppReducer';
import GameSetup from '../components/GameSetup';

export class GameSetupContainer extends Component {
  render() {
    return (
      <GameSetup currentUser={ this.props.currentUser } />
    );
  }
}

const mapStateToProps = (state, props) => ({
  currentUser: getCurrentUser(state)
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameSetupContainer);
