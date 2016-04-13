import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestSports } from '../actions/SportActions';
import { getSports } from '../reducers/SportsReducer';
import { getAppState } from '../reducers/AppReducer';
import NewLeague from '../components/NewLeague';
import { createLeague } from '../actions/LeagueActions';
import { hideNewLeagueModal } from '../actions/AppActions';

export class NewLeagueContainer extends Component {
  componentDidMount() {
    this.props.requestSports();
  }

  render() {
    return (
      <NewLeague
        createLeague={ this.props.createLeague }
        sports={ this.props.sports }
        show={ this.props.show }
        hideNewLeagueModal={ this.props.hideNewLeagueModal } />
    );
  }
}

const mapStateToProps = (state) => ({
  show: getAppState(state).get('showNewLeagueModal'),
  sports: getSports(state)
});

const mapDispatchToProps = {
  hideNewLeagueModal,
  createLeague,
  requestSports
};

export default connect(mapStateToProps, mapDispatchToProps)(NewLeagueContainer);
