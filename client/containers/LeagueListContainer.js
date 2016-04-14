import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestLeagues } from '../actions/LeagueActions';
import { getIsLoading, getLeagues } from '../reducers/LeaguesReducer';
import { showNewLeagueModal } from '../actions/AppActions';
import LeagueList from '../components/LeagueList';

export class LeagueListContainer extends Component {
  componentDidMount() {
    this.props.requestLeagues();
  }

  render() {
    return (
      <LeagueList
        isLoading={ this.props.isLoading }
        leagues={ this.props.leagues }
        showNewLeagueModal={ this.props.showNewLeagueModal }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: getIsLoading(state),
  leagues: getLeagues(state)
});

const mapDispatchToProps = {
  requestLeagues,
  showNewLeagueModal
};

export default connect(mapStateToProps, mapDispatchToProps)(LeagueListContainer);
