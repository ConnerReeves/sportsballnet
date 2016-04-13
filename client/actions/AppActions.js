import {
  HIDE_NEW_LEAGUE_MODAL,
  SHOW_NEW_LEAGUE_MODAL
} from '../utils/Constants';

export const hideNewLeagueModal = () => ({ type: HIDE_NEW_LEAGUE_MODAL });
export const showNewLeagueModal = () => ({ type: SHOW_NEW_LEAGUE_MODAL });
