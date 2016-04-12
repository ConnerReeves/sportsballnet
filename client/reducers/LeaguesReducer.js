import Immutable from 'immutable';
import { RECEIVED_LEAGUES, RECEIVED_NEW_LEAGUE, REQUESTED_LEAGUES, REQUESTED_NEW_LEAGUE } from '../utils/Constants';
import { createReducer } from '../utils/ReducerUtils';

const initialState = Immutable.Map({
  isLoading: true,
  leagues: Immutable.List()
});

const tempLeagueId = 'tempLeagueId';

export default createReducer(initialState, {
  [ REQUESTED_LEAGUES ]: (state) => state.set('isLoading', true),
  [ RECEIVED_LEAGUES ]: (state, { leagues }) => state.set('leagues', Immutable.fromJS(leagues)).set('isLoading', false),
  [ REQUESTED_NEW_LEAGUE ]: (state, { league }) => {
    const newLeague = Object.assign({}, league, { _id: tempLeagueId });
    return state.set('leagues', state.get('leagues').push(Immutable.fromJS(newLeague)));
  },
  [ RECEIVED_NEW_LEAGUE ]: (state, { league }) => {
    return state.set('leagues', state.get('leagues').filterNot( l => l._id === tempLeagueId ).push(Immutable.froJS(league)));
  }
});

const stateKey = 'LeaguesReducer';

export const getLeagues = state => state[stateKey].get('leagues');
export const getIsLoading = state => state[stateKey].get('isLoading');
