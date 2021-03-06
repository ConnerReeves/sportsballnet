import request from 'superagent';
import {
  RECEIVED_HYDRATED_LEAGUE,
  RECEIVED_INVITED_PLAYER,
  RECEIVED_LEAGUES,
  RECEIVED_NEW_LEAGUE,
  RECEIVED_PLAYER_DETAILS,
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
      dispatch({ type: RECEIVED_INVITED_PLAYER, leagueId, player: res.body });
    });
}

export const fetchPlayerDetails = (leagueId, playerIds) => (dispatch) => {
  request
    .get(`/api/leagues/${leagueId}/players`)
    .query({ playerIds })
    .end((err, res) => {
      dispatch({ type: RECEIVED_PLAYER_DETAILS, details: res.body });
    });
};
