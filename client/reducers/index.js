import { combineReducers } from 'redux';
import LeaguesReducer from './LeaguesReducer';
import SportsReducer from './SportsReducer';

export default combineReducers({
  LeaguesReducer,
  SportsReducer
});
