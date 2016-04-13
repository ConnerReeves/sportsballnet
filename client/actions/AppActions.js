import request from 'superagent';
import {
  HIDE_INVITE_PLAYER_MODAL,
  HIDE_NEW_LEAGUE_MODAL,
  SHOW_INVITE_PLAYER_MODAL,
  SHOW_NEW_LEAGUE_MODAL,
  RECEIVE_UNREGISTERED_USER
} from '../utils/Constants';

export const hideInvitePlayerModal = () => ({ type: HIDE_INVITE_PLAYER_MODAL });
export const hideNewLeagueModal = () => ({ type: HIDE_NEW_LEAGUE_MODAL });
export const showInvitePlayerModal = () => ({ type: SHOW_INVITE_PLAYER_MODAL });
export const showNewLeagueModal = () => ({ type: SHOW_NEW_LEAGUE_MODAL });

export const fetchUnregisteredUser = (userId) => dispatch => {
  request
    .get(`/api/users/${userId}`)
    .end((err, res) => {
      dispatch({ type: RECEIVE_UNREGISTERED_USER, user: res.body });
    });
};
