import React, { Component } from 'react';
import { Button, Modal, Glyphicon, Table } from 'react-bootstrap';
import PlayerCard from './PlayerCard';

export default class ReportGameModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedWinner: null
    };
  }

  render() {
    return (
      <Modal className="report-game-modal" show={ this.props.show } onHide={ this.props.hideReportGameModal }>
        <form onSubmit={ this._onSubmit.bind(this) }>
          <Modal.Header closeButton>
            <Modal.Title>Report Game Result</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table>
              <thead>
                <tr>
                  <th className="text-center">Team 1</th>
                  <th className="text-center">Team 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={ this.state.selectedWinner === 'team1' ? 'selected' : '' } width="50%" onClick={ this._selectWinner.bind(this, 'team1') }>
                    { this.props.team1.map((player) => <PlayerCard player={ player } key={ player._id } />) }
                  </td>
                  <td className={ this.state.selectedWinner === 'team2' ? 'selected' : '' } width="50%" onClick={ this._selectWinner.bind(this, 'team2') }>
                    { this.props.team2.map((player) => <PlayerCard player={ player } key={ player._id } />) }
                  </td>
                </tr>
                <tr>
                  <td width="50%">
                    <div className="winner text-center">{ this.state.selectedWinner === 'team1' ? <h5><Glyphicon glyph="star" /> Winner</h5> : null }</div>
                  </td>
                  <td width="50%">
                    <div className="winner text-center">{ this.state.selectedWinner === 'team2' ? <h5><Glyphicon glyph="star" /> Winner</h5> : null }</div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button
              bsStyle="success"
              className="submit-button"
              value="Submit"
              disabled={ !this.state.selectedWinner }
              onClick={ this._onSubmit.bind(this) }>
              Submit
            </Button>
            <Button onClick={ this.props.hideReportGameModal }>Cancel</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }

  _selectWinner(selectedWinner) {
    this.setState({ selectedWinner });
  }

  _onSubmit() {
    const winners = this.props[this.state.selectedWinner].map((player) => player._id);
    const losers = this.props[this.state.selectedWinner === 'team1' ? 'team2' : 'team1'].map((player) => player._id);

    this.props.reportGameResult({ winners, losers , league: this.props.currentLeagueId });
    this.props.hideReportGameModal();
  }
}
