import Immutable from 'immutable';
import {
  HIDE_INVITE_PLAYER_MODAL,
  HIDE_NEW_LEAGUE_MODAL,
  RECEIVED_CURRENT_USER,
  RECEIVED_UNREGISTERED_USER,
  SHOW_INVITE_PLAYER_MODAL,
  SHOW_NEW_LEAGUE_MODAL
} from '../utils/Constants';
import { createReducer } from '../utils/ReducerUtils';

const initialState = Immutable.Map({
  currentUser: null,
  showInvitePlayerModal: false,
  showNewLeagueModal: false,
  unregisteredUser: null
});

export default createReducer(initialState, {
  [ HIDE_INVITE_PLAYER_MODAL ]: (state) => state.set('showInvitePlayerModal', false),
  [ HIDE_NEW_LEAGUE_MODAL ]: (state) => state.set('showNewLeagueModal', false),
  [ RECEIVED_CURRENT_USER ]: (state, { user }) => state.set('currentUser', Immutable.fromJS(user)),
  [ RECEIVED_UNREGISTERED_USER ]: (state, { user }) => state.set('unregisteredUser', Immutable.fromJS(user)),
  [ SHOW_INVITE_PLAYER_MODAL ]: (state) => state.set('showInvitePlayerModal', true),
  [ SHOW_NEW_LEAGUE_MODAL ]: (state) => state.set('showNewLeagueModal', true)
});

const stateKey = 'AppReducer';
export const getAppState = state => state[stateKey];
export const getCurrentUser = state => getAppState(state).get('currentUser');
export const getUnregisteredUser = state => getAppState(state).get('unregisteredUser');
