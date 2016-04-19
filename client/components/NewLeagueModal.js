import React, { Component } from 'react';
import { Button, Table, Modal, Input, ButtonInput } from 'react-bootstrap';
import { validate, TEAM_SIZE_MIN, TEAM_SIZE_MAX } from '../utils/Validation';
import { VALIDATION } from '../utils/Constants';

require('../styles/leagues.scss');

export default class NewLeagueModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      teamSize: ''
    };
  }

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
            value={ this.state.name }
            onChange={ this._updateState.bind(this, 'name') }
            autoFocus={ true }
            bsStyle={ this._validate('name') }
          />
          <Input
            width={ 200 }
            type="number"
            min={ TEAM_SIZE_MIN }
            max={ TEAM_SIZE_MAX }
            label="Players Per Team"
            name="teamSize"
            ref="teamSize"
            value={ this.state.teamSize }
            onChange={ this._updateState.bind(this, 'teamSize') }
            bsStyle={ this._validate('teamSize') }
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
              bsStyle="success"
              className="submit-button"
              type="submit"
              value="Submit"
            />
            <Button onClick={ this.props.hideNewLeagueModal }>Cancel</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }

  _updateState(ref) {
    this.setState({
      [ref]: this.refs[ref].getValue()
    });
  }

  _validate(ref) {
    if (validate(ref, this.state[ref])) {
      return VALIDATION.SUCCESS;
    }

    return VALIDATION.ERROR;
  }

  _isAllDataValid() {
    return this._validate('name') && this._validate('teamSize');
  }

  _onSubmit(e) {
    e.preventDefault();

    if (this._isAllDataValid()) {
      this.props.createLeague({
        name: this.refs.name.getValue(),
        teamSize: this.refs.teamSize.getValue(),
        sport: this.refs.sport.getValue()
      });

      this.props.hideNewLeagueModal();
    }
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
