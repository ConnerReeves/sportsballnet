import React, { Component } from 'react';
import { Label } from 'react-bootstrap';
import Gravatar from 'react-gravatar';
import RecordIndicator from './RecordIndicator';

export default class GameDisplay extends Component {
  render() {
    const { player } = this.props;

    return (
      <div className="player-card" key={ player._id }>
        <Gravatar className="player-avatar" size={ 78 } email={ player.email.toLowerCase() } />
        <h4 className="player-info">
          { player.name }
          <Label>{ Math.round(player.elo) }</Label>
        </h4>
        <RecordIndicator wins={ player.wins } losses={ player.losses } />
      </div>
    );
  }
}
