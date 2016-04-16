import React, { Component } from 'react';
import Immutable from 'immutable';
import { Button, Panel, Table, Label } from 'react-bootstrap';
import Gravatar from 'react-gravatar';
import moment from 'moment';
import RecordIndicator from './RecordIndicator';
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
              <th className="text-center">Win %</th>
              <th className="text-center">Streak</th>
              <th className="text-center">Last Played</th>
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
    return this.props.league.get('players')
              .sortBy((member) => member.getIn(['player', 'elo']))
              .reverse()
              .map((member, index) => {
                const player = member.get('player');
                const lastPlayed = moment(member.get('lastPlayed')).format('MM-DD-YYYY');
                const wins = player.get('wins');
                const losses = player.get('losses');
                const winPercentage = Math.floor((wins / (wins + losses)) * 100) || 0;
                const streak = player.get('streak') || 0;
                const streakClass = streak > 0 ? 'info' : (streak < 0 ? 'danger' : 'default');

                return (
                  <tr key={ player.get('_id') }>
                    <td className="text-center">{ index + 1 }</td>
                    <td>
                      <Gravatar email={ player.get('email').toLowerCase() } size={ 40 } />
                      <div className="player-name">{ player.get('name') }</div>
                    </td>
                    <td className="text-center">{ player.get('elo') }</td>
                    <td width="100%"><RecordIndicator wins={ wins } losses={ losses } /></td>
                    <td className="text-center">{ winPercentage }%</td>
                    <td className="text-center">
                      <Label bsStyle={ streakClass }>{ `${streak > 0 ? '+' : ''}${streak}` }</Label>
                    </td>
                    <td className="text-center">{ lastPlayed }</td>
                  </tr>
                );
              }).toJS();
  }

  _getRandom(max) {
    return Math.floor(Math.random() * max);
  }
}
