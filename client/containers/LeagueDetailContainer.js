import { showInvitePlayerModal } from '../actions/AppActions'
import { fetchLeague } from '../actions/LeagueActions';
import LeagueDetail from '../components/LeagueDetail';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLeague } from '../reducers/LeaguesReducer';

export class LeagueDetailContainer extends Component {
  componentDidMount() {
    this.props.fetchLeague(this.props.params.leagueId);
  }

  componentWillReceiveProps() {
    this.props.fetchLeague(this.props.params.leagueId);
  }

  render() {
    return (
      <LeagueDetail
        league={ this.props.league }
        isLoading={ !this.props.league }
        showInvitePlayerModal={ this.props.showInvitePlayerModal }
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  league: getLeague(state, props.params.leagueId)
});

const mapDispatchToProps = {
  fetchLeague,
  showInvitePlayerModal
};

export default connect(mapStateToProps, mapDispatchToProps)(LeagueDetailContainer);
