import React, { Component } from 'react';
import { Button, Table, Modal, Input, ButtonInput } from 'react-bootstrap';

require('../styles/leagues.scss');

export default class NewLeague extends Component {
  render() {
    return (
      <Modal show={ this.props.show } onHide={ this.props.hideNewLeagueModal }>
        <form onSubmit={ this._onSubmit.bind(this) }>
          <Modal.Header closeButton>
            <Modal.Title>Add New League</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Input
            width={ 200 }
            type="text"
            label="Name"
            name="name"
            ref="name"
            autoFocus={ true }
          />
          <Input
            width={ 200 }
            type="number"
            min={ 1 }
            max={ 4 }
            label="Players Per Team"
            name="teamSize"
            ref="teamSize"
          />
          <Input
            width={ 200 }
            type="select"
            name="sport"
            ref="sport"
            label="Sport">
              { this._getSportsOptions() }
          </Input>
          </Modal.Body>
          <Modal.Footer>
            <ButtonInput
              className="submit-button"
              type="submit"
              value="Submit"
              onClick={ this.props.hideNewLeagueModal }
            />
            <Button onClick={ this.props.hideNewLeagueModal }>Close</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }

  _onSubmit(e) {
    e.preventDefault();

    this.props.createLeague({
      name: this.refs.name.getValue(),
      teamSize: this.refs.teamSize.getValue(),
      sport: this.refs.sport.getValue()
    });
  }

  _getSportsOptions() {
    return this.props.sports.map((sport) => {
      const id = sport.get('_id');
      return (
        <option value={ id } key={ id }>
          { sport.get('name') }
        </option>
      );
    }).toJS();
  }
}
