import React, { Component } from 'react';
import { Button, Table, Modal, Input, ButtonInput } from 'react-bootstrap';
import { validate } from '../utils/Validation';
import { VALIDATION } from '../utils/Constants';

require('../styles/leagues.scss');

export default class InvitePlayerModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      email: ''
    };
  }

  render() {
    return (
      <Modal show={ this.props.show } onHide={ this.props.hideInvitePlayerModal }>
        <form onSubmit={ this._onSubmit.bind(this) }>
          <Modal.Header closeButton>
            <Modal.Title>Invite Player</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Input
            width={ 200 }
            type="text"
            label="Name"
            name="name"
            ref="name"
            autoFocus={ true }
            value={ this.state.teamSize }
            onChange={ this._updateState.bind(this, 'name') }
            bsStyle={ this._validate('name') }
          />
          <Input
            width={ 200 }
            type="email"
            label="Email"
            name="email"
            ref="email"
            value={ this.state.teamSize }
            onChange={ this._updateState.bind(this, 'email') }
            bsStyle={ this._validate('email') }
          />
          </Modal.Body>
          <Modal.Footer>
            <ButtonInput
              bsStyle="success"
              className="submit-button"
              type="submit"
              value="Submit"
              onClick={ this.props.hideInvitePlayerModal }
            />
            <Button onClick={ this.props.hideInvitePlayerModal }>Cancel</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }

  _validate(ref) {
    if (validate(ref, this.state[ref])) {
      return VALIDATION.SUCCESS;
    }

    return VALIDATION.ERROR;
  }

  _updateState(ref) {
    this.setState({
      [ref]: this.refs[ref].getValue()
    });
  }

  _isAllDataValid() {
    return this._validate('name') && this._validate('email');
  }

  _onSubmit(e) {
    e.preventDefault();

    if (this._isAllDataValid()) {
      const leagueId = this.props.league.get('_id');

      this.props.invitePlayer(leagueId, {
        name: this.refs.name.getValue(),
        email: this.refs.email.getValue(),
        currentLeague: leagueId
      });
    }
  }
}
