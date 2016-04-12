import Immutable from 'immutable';
import { RECEIVED_SPORTS } from '../utils/Constants';
import { createReducer } from '../utils/ReducerUtils';

const initialState = Immutable.List();

export default createReducer(initialState, {
  [ RECEIVED_SPORTS ]: (state, { sports }) => Immutable.fromJS(sports)
});

const stateKey = 'SportsReducer';
export const getSports = (state) => state[stateKey];
