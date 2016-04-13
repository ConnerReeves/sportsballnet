import request from 'superagent';
import {
  RECEIVED_HYDRATED_LEAGUE,
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
};

export const fetchLeague = (leagueId) => dispatch => {
  request
    .get(`/api/leagues/${leagueId}`)
    .end((err, res) => {
      dispatch({ type: RECEIVED_HYDRATED_LEAGUE, league: res.body });
    });
};

export const invitePlayer = (leagueId, player) => dispatch => {
  request
    .post(`/api/leagues/${leagueId}/players`)
    .send(player)
    .end((err, res) => {
      //
    });
}
