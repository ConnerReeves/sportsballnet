import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAppState } from '../reducers/AppReducer';
import ReportGameModal from '../components/ReportGameModal';
import { hideReportGameModal } from '../actions/AppActions';
import { reportGameResult } from '../actions/GameActions';

export class ReportGameModalContainer extends Component {
  render() {
    return (
      <ReportGameModal
        currentLeagueId={ this.props.currentLeagueId }
        hideReportGameModal={ this.props.hideReportGameModal }
        reportGameResult={ this.props.reportGameResult }
        show={ this.props.show }
        team1={ this.props.team1 }
        team2={ this.props.team2 }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  show: getAppState(state).get('showReportGameModal')
});

const mapDispatchToProps = {
  hideReportGameModal,
  reportGameResult
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportGameModalContainer);
