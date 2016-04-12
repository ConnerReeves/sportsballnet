import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestLeagues } from '../actions/LeagueActions';
import { getIsLoading, getLeagues } from '../reducers/LeaguesReducer';
import Leagues from '../components/Leagues';

export class LeaguesContainer extends Component {
  componentDidMount() {
    this.props.requestLeagues();
  }

  render() {
    return (
      <Leagues
        isLoading={ this.props.isLoading }
        leagues={ this.props.leagues } />
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: getIsLoading(state),
  leagues: getLeagues(state)
});

const mapDispatchToProps = {
  requestLeagues
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaguesContainer);
