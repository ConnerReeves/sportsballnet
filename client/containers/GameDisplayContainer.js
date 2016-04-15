import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGamePlayers } from '../reducers/GameReducer';
import GameDisplay from '../components/GameDisplay';

export class GameDisplayContainer extends Component {
  render() {
    return (
      <GameDisplay
        gamePlayers={ this.props.gamePlayers }
        maxPlayerCount={ this.props.maxPlayerCount }
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  gamePlayers: getGamePlayers(state)
});

export default connect(mapStateToProps)(GameDisplayContainer);
