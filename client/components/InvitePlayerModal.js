import React, { Component } from 'react';
import { Button, Table, Modal, Input, ButtonInput } from 'react-bootstrap';

require('../styles/leagues.scss');

export default class InvitePlayerModal extends Component {
  render() {
    return (
      <Modal show={ this.props.show } onHide={ this.props.hideInvitePlayerModal }>
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
            type="email"
            label="Email"
            name="email"
            ref="email"
          />
          </Modal.Body>
          <Modal.Footer>
            <ButtonInput
              className="submit-button"
              type="submit"
              value="Submit"
              onClick={ this.props.hideInvitePlayerModal }
            />
            <Button onClick={ this.props.hideInvitePlayerModal }>Close</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }

  _onSubmit(e) {
    e.preventDefault();

    this.props.invitePlayer(this.props.league.get('_id'), {
      name: this.refs.name.getValue(),
      email: this.refs.email.getValue(),
    });
  }
}
