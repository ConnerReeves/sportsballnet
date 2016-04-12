import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class Leagues extends Component {
  render() {
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
          <td>{ league.get('name') }</td>
          <td width="300">{ league.getIn(['sport', 'name']) }</td>
          <td width="100">{ `${teamSize} vs ${teamSize}` }</td>
        </tr>
      );
    }).toJS();
  }
}
