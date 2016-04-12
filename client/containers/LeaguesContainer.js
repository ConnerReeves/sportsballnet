import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestLeagues } from '../actions/LeagueActions';
import { getLeagues } from '../reducers/LeaguesReducer';
import Leagues from '../components/Leagues';

export class LeaguesContainer extends Component {
  componentDidMount() {
    this.props.requestLeagues();
  }

  render() {
    return (
      <Leagues leagues={ this.props.leagues } />
    );
  }
}

const mapStateToProps = (state) => ({
  leagues: getLeagues(state)
});

const mapDispatchToProps = {
  requestLeagues
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaguesContainer);
