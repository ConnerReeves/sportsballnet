import Immutable from 'immutable';
import { RECEIVED_LEAGUES } from '../utils/Constants';
import { createReducer } from '../utils/ReducerUtils';

const initialState = Immutable.List();

export default createReducer(initialState, {
  [ RECEIVED_LEAGUES ]: (state, { leagues }) => Immutable.fromJS(leagues)
});

const stateKey = 'LeaguesReducer';
export const getLeagues = (state) => state[stateKey];
