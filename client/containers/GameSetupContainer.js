import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../reducers/AppReducer';
import GameSetup from '../components/GameSetup';
import { updateCurrentUserLeague } from '../actions/AppActions';
import { updateGamePlayers } from '../actions/GameActions';
import { fetchPlayerDetails } from '../actions/LeagueActions';

export class GameSetupContainer extends Component {
  render() {
    return (
      <GameSetup
        currentLeague={ this.props.currentLeague }
        currentUser={ this.props.currentUser }
        fetchPlayerDetails={ this.props.fetchPlayerDetails }
        gamePlayers = { this.props.gamePlayers }
        leaguePlayers={ this.props.leaguePlayers }
        leagues={ this.props.leagues }
        maxPlayerCount = { this.props.maxPlayerCount }
        updateCurrentUserLeague = { this.props.updateCurrentUserLeague }
        updateGamePlayers = { this.props.updateGamePlayers }
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const currentUser = getCurrentUser(state);
  const leagues = currentUser && currentUser.get('leagues');
  const currentLeague = currentUser && leagues && leagues.find((league) => league.get('_id') === currentUser.get('currentLeague'));
  const leaguePlayers = currentLeague && currentLeague.get('players').map((player) => player.get('player'));
  const maxPlayerCount = currentLeague && currentLeague.get('teamSize') * 2;

  return {
    currentLeague,
    currentUser,
    leaguePlayers,
    leagues,
    maxPlayerCount
  };
};

const mapDispatchToProps = {
  fetchPlayerDetails,
  updateCurrentUserLeague,
  updateGamePlayers
};

export default connect(mapStateToProps, mapDispatchToProps)(GameSetupContainer);
