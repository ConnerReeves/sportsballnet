import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import InvitePlayerModalContainer from '../containers/InvitePlayerModalContainer';

export default class LeagueDetail extends Component {
  render() {
    return (
      <div>
        { this._getInvitePlayerButton() }
        { this._getPlayersTable() }
        <InvitePlayerModalContainer league={ this.props.league } />
      </div>
    );
  }

  _getInvitePlayerButton() {
    return (
      <Button
        bsStyle="success"
        className="invite-player-button"
        onClick={ this.props.showInvitePlayerModal }>
        Invite New Player
      </Button>
    );
  }

  _getPlayersTable() {
    if (this.props.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <Table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          { this._getPlayerRows() }
        </tbody>
      </Table>
    );
  }

  _getPlayerRows() {
    return this.props.league.get('players').map((player, index) => {
      player = player.get('player');

      return (
        <tr key={ player.get('_id') }>
          <td width="50">{ index + 1 }</td>
          <td>
            <a href={ `/players/${player.get('_id')}` }>{ player.get('name') }</a>
          </td>
          <td>{ player.get('email') }</td>
        </tr>
      );
    }).toJS();
  }
}
