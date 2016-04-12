import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestSports } from '../actions/SportActions';
import { getSports } from '../reducers/SportsReducer';
import NewLeague from '../components/NewLeague';
import { createLeague } from '../actions/LeagueActions';

export class NewLeagueContainer extends Component {
  componentDidMount() {
    this.props.requestSports();
  }

  render() {
    return (
      <NewLeague
        createLeague={ this.props.createLeague }
        sports={ this.props.sports }
        showModal={ this.props.showModal }
        closeNewLeagueModal={ this.props.closeNewLeagueModal } />
    );
  }
}

const mapStateToProps = (state) => ({
  sports: getSports(state)
});

const mapDispatchToProps = {
  createLeague,
  requestSports
};

export default connect(mapStateToProps, mapDispatchToProps)(NewLeagueContainer);
