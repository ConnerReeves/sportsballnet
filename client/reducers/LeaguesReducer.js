import Immutable from 'immutable';
import {
  RECEIVED_HYDRATED_LEAGUE,
  RECEIVED_INVITED_PLAYER,
  RECEIVED_LEAGUES,
  RECEIVED_NEW_LEAGUE,
  REQUESTED_LEAGUES,
  REQUESTED_NEW_LEAGUE
} from '../utils/Constants';
import { createReducer } from '../utils/ReducerUtils';

const initialState = Immutable.Map({
  isLoading: true,
  leagues: Immutable.List(),
  hydratedLeagues: Immutable.Map()
});

export default createReducer(initialState, {
  [ RECEIVED_LEAGUES ]: (state, { leagues }) => state.set('leagues', Immutable.fromJS(leagues)).set('isLoading', false),
  [ RECEIVED_NEW_LEAGUE ]: (state, { league }) => state.update('leagues', (leagues) => leagues.push(Immutable.fromJS(league))),
  [ RECEIVED_HYDRATED_LEAGUE ]: (state, { league }) => state.setIn(['hydratedLeagues', league._id], Immutable.fromJS(league)),
  [ RECEIVED_INVITED_PLAYER ]: (state, { leagueId, player }) => {
    return state.updateIn(['hydratedLeagues', leagueId, 'players'], (players) => players.push(Immutable.fromJS(player)));
  }
});

const stateKey = 'LeaguesReducer';

export const getLeagues = state => state[stateKey].get('leagues');
export const getLeague = (state, leagueId) => state[stateKey].getIn(['hydratedLeagues', leagueId]);
export const getIsLoading = state => state[stateKey].get('isLoading');
