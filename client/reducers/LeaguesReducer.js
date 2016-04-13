import Immutable from 'immutable';
import { RECEIVED_LEAGUES, RECEIVED_NEW_LEAGUE, REQUESTED_LEAGUES, REQUESTED_NEW_LEAGUE } from '../utils/Constants';
import { createReducer } from '../utils/ReducerUtils';

const initialState = Immutable.Map({
  isLoading: true,
  leagues: Immutable.List()
});

export default createReducer(initialState, {
  [ RECEIVED_LEAGUES ]: (state, { leagues }) => state.set('leagues', Immutable.fromJS(leagues)).set('isLoading', false),
  [ RECEIVED_NEW_LEAGUE ]: (state, { league }) => state.update('leagues', (leagues) => leagues.push(Immutable.fromJS(league)))
});

const stateKey = 'LeaguesReducer';

export const getLeagues = state => state[stateKey].get('leagues');
export const getIsLoading = state => state[stateKey].get('isLoading');
