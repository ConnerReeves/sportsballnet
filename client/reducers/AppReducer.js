import Immutable from 'immutable';
import { SHOW_NEW_LEAGUE_MODAL, HIDE_NEW_LEAGUE_MODAL } from '../utils/Constants';
import { createReducer } from '../utils/ReducerUtils';

const initialState = Immutable.Map({
  showNewLeagueModal: false
});

export default createReducer(initialState, {
  [ SHOW_NEW_LEAGUE_MODAL ]: (state) => state.set('showNewLeagueModal', true),
  [ HIDE_NEW_LEAGUE_MODAL ]: (state) => state.set('showNewLeagueModal', false)
});

const stateKey = 'AppReducer';
export const getAppState = state => state[stateKey];
