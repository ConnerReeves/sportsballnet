import React, { Component } from 'react';
import { Input } from 'react-bootstrap';
import Typeahead from 'react-bootstrap-typeahead';

export default class GameSetup extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedPlayerIds: []
    };
  }

  render() {
    if (this.props.currentUser.size) {
      const currentLeagueId = this.props.currentUser.get('currentLeague');
      const maxPlayerCount = this.props.currentLeague.get('teamSize') * 2;

      const leaguePlayerOptions = this._getLeaguePlayerOptions();

      return (
        <div>
          <Input type="select" label="Select League" value={ currentLeagueId } onChange={ this._onLeagueChange.bind(this) }>
            { this._getLeagueOptions() }
          </Input>
          <div className="form-group">
            <label className="control-label">Choose players</label>
            <Typeahead
              placeholder={ `Add Players (${maxPlayerCount} Max)` }
              emptyLabel="No League Players"
              onChange={ this._onPlayerSelectionChange.bind(this) }
              options={ leaguePlayerOptions }
              multiple={ true }
              key={ currentLeagueId }
            />
          </div>
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
  }

  _onPlayerSelectionChange(selectedPlayers) {
    const selectedPlayerIds = selectedPlayers.map((player) => player.id);
    this.setState({ selectedPlayerIds });
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
