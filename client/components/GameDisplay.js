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
        disabled={ this.props.gamePlayers.size !== this.props.maxPlayerCount }
        className="start-game-button"
        onClick={ () => {} }>
        Start Game
      </Button>
    );
  }

  _getTeams() {
    const { gamePlayers } = this.props;
    let team1 = Immutable.List();
    let team2 = Immutable.List();

    if (gamePlayers) {
      const sortedPlayers = gamePlayers.sortBy((player) => player.get('elo'));
      const reversedSortedPlayers = gamePlayers.sortBy((player) => player.get('elo')).reverse();

      const player1 = reversedSortedPlayers.get(0);
      team1 = player1 ? team1.push(player1.toJS()) : team1;

      const player2 = reversedSortedPlayers.get(1);
      team2 = player2 ? team2.push(player2.toJS()) : team2;

      sortedPlayers.forEach((player, index) => {
        if (index < sortedPlayers.size - 2) {
          if (index % 2 === 0) {
            team1 = team1.push(player.toJS());
          } else {
            team2 = team2.push(player.toJS());
          }
        }
      });
    }

    return {
      team1: team1.toJS(),
      team2: team2.toJS()
    };
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
