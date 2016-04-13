import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import NewLeagueModalContainer from '../containers/NewLeagueModalContainer';

require('../styles/leagues.scss');

export default class Leagues extends Component {
  render() {
    return (
      <div>
        { this._getAddLeagueButton() }
        { this._getLeagueTable() }
        <NewLeagueModalContainer />
      </div>
    );
  }

  _getAddLeagueButton() {
    return (
      <Button
        bsStyle="success"
        className="add-league-button"
        onClick={ this.props.showNewLeagueModal }>
        Add League
      </Button>
    );
  }

  _getLeagueTable() {
    if (this.props.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <Table>
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
