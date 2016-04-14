import request from 'superagent';
import {
  UPDATE_GAME_PLAYERS
} from '../utils/Constants';

export const updateGamePlayers = (players) => (dispatch) => {
  dispatch({ type: UPDATE_GAME_PLAYERS, players });
};
