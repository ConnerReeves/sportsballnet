import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGamePlayers } from '../reducers/GameReducer';
import { showReportGameModal } from '../actions/AppActions';
import GameDisplay from '../components/GameDisplay';

export class GameDisplayContainer extends Component {
  render() {
    return (
      <GameDisplay
        currentLeagueId={ this.props.currentLeagueId }
        gamePlayers={ this.props.gamePlayers }
        maxPlayerCount={ this.props.maxPlayerCount }
        showReportGameModal={ this.props.showReportGameModal }
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  gamePlayers: getGamePlayers(state)
});

const mapDispatchToProps = {
  showReportGameModal
};

export default connect(mapStateToProps, mapDispatchToProps)(GameDisplayContainer);
