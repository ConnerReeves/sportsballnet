import Immutable from 'immutable';
import {
  RECEIVED_PLAYER_DETAILS,
  UPDATE_GAME_PLAYERS
} from '../utils/Constants';
import { createReducer } from '../utils/ReducerUtils';

const initialState = Immutable.fromJS({
  players: [],
  details: {}
});

export default createReducer(initialState, {
  [ UPDATE_GAME_PLAYERS ]: (state, { players }) => state.set('players', Immutable.fromJS(players)),
  [ RECEIVED_PLAYER_DETAILS ]: (state, { details }) => state.set('details', Immutable.fromJS(details))
});

const stateKey = 'GameReducer';
export const getGamePlayers = state => {
  const localState = state[stateKey];
  return localState.get('players').map((player) => {
    return player.mergeDeep(localState.getIn(['details', player.get('_id')]));
  });
};
