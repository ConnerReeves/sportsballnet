import request from 'superagent';
import {
  HIDE_INVITE_PLAYER_MODAL,
  HIDE_NEW_LEAGUE_MODAL,
  RECEIVED_CURRENT_USER,
  RECEIVED_UNREGISTERED_USER,
  SHOW_INVITE_PLAYER_MODAL,
  SHOW_NEW_LEAGUE_MODAL,
  UPDATE_CURRENT_USER_LEAGUE
} from '../utils/Constants';

export const hideInvitePlayerModal = () => ({ type: HIDE_INVITE_PLAYER_MODAL });
export const hideNewLeagueModal = () => ({ type: HIDE_NEW_LEAGUE_MODAL });
export const showInvitePlayerModal = () => ({ type: SHOW_INVITE_PLAYER_MODAL });
export const showNewLeagueModal = () => ({ type: SHOW_NEW_LEAGUE_MODAL });

export const fetchCurrentUser = () => dispatch => {
  request
    .get('/app/user')
    .end((err, res) => {
      dispatch({ type: RECEIVED_CURRENT_USER, user: res.body });
    });
};

export const fetchUnregisteredUser = (userId) => dispatch => {
  request
    .get(`/api/users/${userId}`)
    .end((err, res) => {
      dispatch({ type: RECEIVED_UNREGISTERED_USER, user: res.body });
    });
};

export const updateCurrentUserLeague = (userId, leagueId) => dispatch => {
  dispatch({ type: UPDATE_CURRENT_USER_LEAGUE, leagueId });

  request
    .put(`/api/users/${userId}`)
    .send({ currentLeague: leagueId })
    .end();
}
