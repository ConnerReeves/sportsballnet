import React, { Component } from 'react';
import Immutable from 'immutable';
import Gravatar from 'react-gravatar';
import { Button, Label, Panel, Table } from 'react-bootstrap';
import RecordIndicator from './RecordIndicator';
require('../styles/game-display.scss');

export default class GameDisplay extends Component {
  render() {
    if (this._playerElosLoaded()) {
      const { team1, team2 } = this._getTeams();

      const header = (
        <div className="clear-fix">
          { this._getStartGameButton() }
        </div>
      );

      return (
        <Panel className="game-display" header={ header }>
          <Table>
            <thead>
              <tr>
                <th className="text-center">Team 1</th>
                <th className="text-center">Team 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width="50%">
                  { team1 ? team1.map(this._getPlayerCard.bind(this)) : null }
                </td>
                <td width="50%">
                  { team2 ? team2.map(this._getPlayerCard.bind(this)) : null }
                </td>
              </tr>
            </tbody>
          </Table>
        </Panel>
      );
    }

    return null;
  }

  _playerElosLoaded() {
    return this.props.gamePlayers.every((player) => player.get('elo') !== undefined);
  }

  _getStartGameButton() {
    return (
      <Button
        bsSize="xsmall"
        bsStyle="success"
        disabled={ true } //false after game has correct number of players
        className="start-game-button"
        onClick={ () => {} }>
        Start Game
      </Button>
    );
  }

  _getTeams() {
    return this.props.gamePlayers
            .sortBy((player) => player.get('elo'))
            .reverse()
            .reduce((teams, player, index) => {
              return teams.update(`team${(index % 2) + 1}`, (team) => team ? team.push(player) : Immutable.List([ player ]));
            }, Immutable.Map()).toJS();
  }

  _getPlayerCard(player) {
    return (
      <div className="player-card" key={ player._id }>
        <Gravatar className="player-avatar" size={ 80 } email={ player.email.toLowerCase() } />
        <h4 className="player-info">
          { player.name }
          <Label>{ player.elo }</Label>
        </h4>
        <RecordIndicator wins={ player.wins } losses={ player.losses } />
      </div>
    );
  }
}
