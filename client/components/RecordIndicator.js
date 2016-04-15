import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
require('../styles/auth.scss');

export default class RecordIndicator extends Component {
  render() {
    const { wins, losses } = this.props;
    const winPercentage = Math.floor((wins / (wins + losses)) * 100);

    if (wins || losses) {
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

    return <ProgressBar />
  }
}
