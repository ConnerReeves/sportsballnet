import Immutable from 'immutable';
import { createReducer } from '../utils/ReducerUtils';

const initialState = Immutable.Map({});

export default createReducer(initialState, {});

const stateKey = 'NavReducer';
