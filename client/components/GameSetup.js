import React, { Component } from 'react';
import { Input } from 'react-bootstrap';
import Typeahead from 'react-bootstrap-typeahead';

export default class GameSetup extends Component {
  render() {
    if (this.props.currentUser) {
      return (
        <div>
          <Input type="select" label="Select League" onChange={ this.props.updateCurrentUserLeague }>
            { this._getLeagueOptions() }
          </Input>
          <div className="form-group">
            <label className="control-label">Choose players</label>
            <Typeahead
              placeholder="Add Players"
              emptyLabel="Player not in the league"
              onChange={ () => {} }
              options={ this._getLeaguePlayerOptions() }
              multiple={ true }
            />
          </div>
        </div>
      );
    }

    return null;
  }

  _getLeagueOptions() {
    const currentLeagueId = this.props.currentUser.get('currentLeague');

    return this.props.currentUser.get('leagues').map((league) => {
      const id = league.get('_id');

      return (
        <option key={ id } value={ id }>{ league.get('name') }</option>
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
