import request from 'superagent';
import {
  RECEIVED_LEAGUES,
  RECEIVED_NEW_LEAGUE,
  REQUESTED_NEW_LEAGUE
} from '../utils/Constants';

export const requestLeagues = () => (dispatch) => {
  request
    .get('/api/leagues')
    .end((err, res) => {
      dispatch({ type: RECEIVED_LEAGUES, leagues: res.body });
    });
};

export const createLeague = (league) => dispatch => {
  request
    .post('/api/leagues')
    .send(league)
    .end((err, res) => {
      dispatch({ type: RECEIVED_NEW_LEAGUE, league: res.body });
    });
}
