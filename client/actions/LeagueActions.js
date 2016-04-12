import { RECEIVED_LEAGUES, RECEIVED_NEW_LEAGUE, REQUESTED_NEW_LEAGUE } from '../utils/Constants';

export const requestLeagues = () => (dispatch) => {
  fetch('/api/leagues').then(res => res.json()).then((leagues) => {
    dispatch({ type: RECEIVED_LEAGUES, leagues });
  });
};

export const createLeague = (league) => dispatch => {
  dispatch({ type: REQUESTED_NEW_LEAGUE, league });

  fetch('/api/leagues', {
    method: 'POST',
    credentials: 'include'
  }).then(res => res.json()).then(league => {
    dispatch({ type: RECEIVED_NEW_LEAGUE, league});
  });
}
