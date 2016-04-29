import React, { Component } from 'react';
import Immutable from 'immutable';
import { Button, Label, Panel, Table } from 'react-bootstrap';
import PlayerCard from './PlayerCard';
import ReportGameModalContainer from '../containers/ReportGameModalContainer';
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
        <div>
          <Panel className="game-display" header={ header }>
            <Table>
              <thead>
                <tr>
                  <th className="text-center">Team 1{ this._teamScoreDisplay(team1.score) }</th>
                  <th className="text-center">Team 2{ this._teamScoreDisplay(team2.score) }</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="50%">
                    { team1.players ? team1.players.map((player) => <PlayerCard player={ player } key={ player._id } />) : null }
                  </td>
                  <td width="50%">
                    { team2.players ? team2.players.map((player) => <PlayerCard player={ player } key={ player._id } />) : null }
                  </td>
                </tr>
              </tbody>
            </Table>
          </Panel>
          <ReportGameModalContainer
            currentLeagueId={ this.props.currentLeagueId }
            team1={ team1.players }
            team2={ team2.players }
          />
        </div>
      );
    }

    return null;
  }

  _teamScoreDisplay(score) {
    if (score) {
      return <small className="team-score"> { score }</small>;
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
        onClick={ this.props.showReportGameModal }>
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
      team1: { score: this._getTeamScore(team1), players: team1.toJS() },
      team2: { score: this._getTeamScore(team2), players: team2.toJS() }
    };
  }

  _getTeamScore(team) {
    return parseInt(team.reduce((totalElo, player) => totalElo + player.elo, 0) / team.size, 10);
  }
}
