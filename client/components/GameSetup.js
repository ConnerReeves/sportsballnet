import React, { Component } from 'react';
import Immutable from 'immutable';
import { Input } from 'react-bootstrap';
import Typeahead from 'react-bootstrap-typeahead';
import GameDisplayContainer from '../containers/GameDisplayContainer';

export default class GameSetup extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedPlayerIds: [],
      renderKey: 0
    };
  }

  render() {
    if (this.props.currentUser.size) {
      const currentLeagueId = this.props.currentUser.get('currentLeague');
      const playerIdKey = this.state.selectedPlayerIds.reduce((key, playerId) => `${key}${playerId}`, '');
      const leaguePlayerOptions = this._getLeaguePlayerOptions();
      const selectedPlayerOptions = leaguePlayerOptions.filter((option) => this.state.selectedPlayerIds.includes(option.id));

      return (
        <div>
          <Input type="select" label="Select League" value={ currentLeagueId } onChange={ this._onLeagueChange.bind(this) }>
            { this._getLeagueOptions() }
          </Input>
          <div className="form-group">
            <label className="control-label">Choose Players</label>
            <Typeahead
              placeholder={ `Add Players (${this.props.maxPlayerCount} Max)` }
              emptyLabel="No League Players"
              onChange={ this._onPlayerSelectionChange.bind(this) }
              options={ leaguePlayerOptions }
              multiple={ true }
              key={ `${currentLeagueId}${this.state.renderKey}` }
              selected={ selectedPlayerOptions }
            />
          </div>
          <GameDisplayContainer maxPlayerCount={ this.props.maxPlayerCount } />
        </div>
      );
    }

    return null;
  }

  _onLeagueChange(e) {
    const leagueId = e.target.value;
    const userId = this.props.currentUser.get('_id');
    this.props.updateCurrentUserLeague(userId, leagueId);

    this.setState({ selectedPlayerIds: [] });
    this.props.updateGamePlayers(Immutable.List());
  }

  _onPlayerSelectionChange(selectedPlayers) {
    this.setState({ renderKey: this.state.renderKey + 1 }); //Uber hack to get around react-bootstrap-typeahead not oberving "selected" prop

    if (selectedPlayers.length <= this.props.maxPlayerCount) {
      const selectedPlayerIds = selectedPlayers.map((player) => player.id);
      this.setState({ selectedPlayerIds });

      this.props.fetchPlayerDetails(this.props.currentLeague.get('_id'), selectedPlayerIds);
      this.props.updateGamePlayers(this.props.leaguePlayers.filter((player) => {
        return selectedPlayerIds.indexOf(player.get('_id')) !== -1;
      }));
    }
  }

  _getLeagueOptions() {
    return this.props.currentUser.get('leagues').map((league) => {
      const id = league.get('_id');

      return (
        <option key={ id } value={ id }>
          { league.get('name') }
        </option>
      );
    }).toJS();
  }

  _getLeaguePlayerOptions() {
    if (this.props.leaguePlayers) {
      return this.props.leaguePlayers.map((player) => {
        return {
          id: player.get('_id'),
          label: player.get('name')
        };
      }).toJS();
    }

    return [];
  }
}
