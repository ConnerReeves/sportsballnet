import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import GameReducer from './GameReducer';
import LeaguesReducer from './LeaguesReducer';
import SportsReducer from './SportsReducer';

export default combineReducers({
  AppReducer,
  GameReducer,
  LeaguesReducer,
  SportsReducer
});
