import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../reducers/AppReducer';
import GameSetup from '../components/GameSetup';
import { updateCurrentUserLeague } from '../actions/AppActions';

export class GameSetupContainer extends Component {
  render() {
    const { currentUser, leagues, currentLeague, leaguePlayers, updateCurrentUserLeague } = this.props;

    return (
      <GameSetup
        currentUser={ currentUser }
        leagues={ leagues }
        currentLeague={ currentLeague }
        leaguePlayers={ leaguePlayers }
        updateCurrentUserLeague = { updateCurrentUserLeague }
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const currentUser = getCurrentUser(state);
  const leagues = currentUser && currentUser.get('leagues');
  const currentLeague = currentUser && leagues && leagues.find((league) => league.get('_id') === currentUser.get('currentLeague'));
  const leaguePlayers = currentLeague && currentLeague.get('players').map((player) => player.get('player'));

  return {
    currentUser,
    leagues,
    currentLeague,
    leaguePlayers
  };
};

const mapDispatchToProps = {
  updateCurrentUserLeague
};

export default connect(mapStateToProps, mapDispatchToProps)(GameSetupContainer);
