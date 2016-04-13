import Immutable from 'immutable';
import {
  HIDE_INVITE_PLAYER_MODAL,
  HIDE_NEW_LEAGUE_MODAL,
  RECEIVE_UNREGISTERED_USER,
  SHOW_INVITE_PLAYER_MODAL,
  SHOW_NEW_LEAGUE_MODAL
} from '../utils/Constants';
import { createReducer } from '../utils/ReducerUtils';

const initialState = Immutable.Map({
  showInvitePlayerModal: false,
  showNewLeagueModal: false,
  unregisteredUser: null
});

export default createReducer(initialState, {
  [ HIDE_INVITE_PLAYER_MODAL ]: (state) => state.set('showInvitePlayerModal', false),
  [ HIDE_NEW_LEAGUE_MODAL ]: (state) => state.set('showNewLeagueModal', false),
  [ SHOW_INVITE_PLAYER_MODAL ]: (state) => state.set('showInvitePlayerModal', true),
  [ SHOW_NEW_LEAGUE_MODAL ]: (state) => state.set('showNewLeagueModal', true),
  [ RECEIVE_UNREGISTERED_USER ]: (state, { user }) => state.set('unregisteredUser', Immutable.fromJS(user))
});

const stateKey = 'AppReducer';
export const getAppState = state => state[stateKey];
export const getUnregisteredUser = state => getAppState(state).get('unregisteredUser');
