import React, { Component } from 'react';
import Immutable from 'immutable';
import { Button, Panel, ProgressBar, Table } from 'react-bootstrap';
import Gravatar from 'react-gravatar';
import moment from 'moment';
import InvitePlayerModalContainer from '../containers/InvitePlayerModalContainer';

export default class LeagueDetail extends Component {
  render() {
    return (
      <div>
        { this._getPlayersTable() }
        <InvitePlayerModalContainer league={ this.props.league } />
      </div>
    );
  }

  _getPlayersTable() {
    if (this.props.isLoading) {
      return <div>Loading...</div>;
    }

    const header = (
      <div>
        { this.props.league.get('name') }
        { this._getInvitePlayerButton() }
      </div>
    );

    return (
      <Panel header={ header }>
        <Table className="player-table">
          <thead>
            <tr>
              <th className="text-center">Rank</th>
              <th>Player</th>
              <th className="text-center">Rating</th>
              <th>Record</th>
              <th></th>
              <th className="text-center">Joined</th>
            </tr>
          </thead>
          <tbody>
            { this._getPlayerRows() }
          </tbody>
        </Table>
      </Panel>
    );
  }

  _getInvitePlayerButton() {
    return (
      <Button
        bsSize="xsmall"
        bsStyle="success"
        className="invite-player-button"
        onClick={ this.props.showInvitePlayerModal }>
        Invite New Player
      </Button>
    );
  }

  _getPlayerRows() {
    const playersWithMockRecordData = this.props.league.get('players').map((member) => {
      const wins = this._getRandom(200);
      const losses = this._getRandom(200);
      const winPercentage = Math.floor((wins / (wins + losses)) * 100);
      const rating = Math.floor((winPercentage / 100) * 2000);

      return member.merge(Immutable.fromJS({ wins, losses, winPercentage, rating }));
    }).sortBy((member) => member.get('rating')).reverse();

    return playersWithMockRecordData.map((member, index) => {
      const player = member.get('player');
      const joinedDate = moment(member.get('joinedDate')).format('MM-DD-YYYY');

      return (
        <tr key={ player.get('_id') }>
          <td width="50" className="text-center">{ index + 1 }</td>
          <td>
            <Gravatar email={ player.get('email').toLowerCase() } size={ 40 } />
            <div className="player-name">{ player.get('name') }</div>
          </td>
          <td width="100" className="text-center">{ member.get('rating') }</td>
          <td width="100%">{ this._getRecordIndicator(member) }</td>
          <td width="25" className="text-center">{ member.get('winPercentage') }%</td>
          <td width="100" className="text-center">{ joinedDate }</td>
        </tr>
      );
    }).toJS();
  }

  _getRandom(max) {
    return Math.floor(Math.random() * max);
  }

  _getRecordIndicator(member) {
    const wins = member.get('wins');
    const losses = member.get('losses');
    const winPercentage = member.get('winPercentage');

    return (
      <ProgressBar>
        <ProgressBar
          bsStyle="info"
          key="wins"
          label={ wins }
          now={ winPercentage }
        />
        <ProgressBar
          bsStyle="danger"
          key="losses"
          label={ losses }
          now={ 100 - winPercentage }
        />
      </ProgressBar>
    );
  }
}
