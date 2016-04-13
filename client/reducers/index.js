import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import LeaguesReducer from './LeaguesReducer';
import SportsReducer from './SportsReducer';

export default combineReducers({
  AppReducer,
  LeaguesReducer,
  SportsReducer
});
