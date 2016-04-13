import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAppState } from '../reducers/AppReducer';
import InvitePlayerModal from '../components/InvitePlayerModal';
import { hideInvitePlayerModal } from '../actions/AppActions';
import { invitePlayer } from '../actions/LeagueActions';

export class InvitePlayerModalContainer extends Component {
  render() {
    return (
      <InvitePlayerModal
        league={ this.props.league }
        show={ this.props.show }
        hideInvitePlayerModal={ this.props.hideInvitePlayerModal }
        invitePlayer={ this.props.invitePlayer }
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  show: getAppState(state).get('showInvitePlayerModal')
});

const mapDispatchToProps = {
  hideInvitePlayerModal,
  invitePlayer
};

export default connect(mapStateToProps, mapDispatchToProps)(InvitePlayerModalContainer);
