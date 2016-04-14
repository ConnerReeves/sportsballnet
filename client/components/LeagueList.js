import React, { Component } from 'react';
import { Button, Panel, Table } from 'react-bootstrap';
import NewLeagueModalContainer from '../containers/NewLeagueModalContainer';

require('../styles/leagues.scss');

export default class LeagueList extends Component {
  render() {
    return (
      <div>
        { this._getLeagueTable() }
        <NewLeagueModalContainer />
      </div>
    );
  }

  _getLeagueTable() {
    if (this.props.isLoading) {
      return <div>Loading...</div>;
    }

    const header = (
      <div>
        Leagues
        { this._getAddLeagueButton() }
      </div>
    );

    return (
      <Panel header={ header }>
        <Table className="leagues-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Sport</th>
              <th>Players</th>
            </tr>
          </thead>
          <tbody>
            { this._getLeagueRows() }
          </tbody>
        </Table>
      </Panel>
    );
  }

  _getAddLeagueButton() {
    return (
      <Button
        bsSize="xsmall"
        bsStyle="success"
        className="add-league-button"
        onClick={ this.props.showNewLeagueModal }>
        Add League
      </Button>
    );
  }

  _getLeagueRows() {
    return this.props.leagues.map((league) => {
      const teamSize = league.get('teamSize');

      return (
        <tr key={ league.get('_id') }>
          <td>
            <a href={ `/leagues/${league.get('_id')}` }>{ league.get('name') }</a>
          </td>
          <td width="300">{ league.getIn(['sport', 'name']) }</td>
          <td width="100">{ `${teamSize} vs ${teamSize}` }</td>
        </tr>
      );
    }).toJS();
  }
}
