import { RECEIVED_LEAGUES } from '../utils/Constants';

export const requestLeagues = () => (dispatch) => {
  fetch('/api/leagues').then(res => res.json()).then((leagues) => {
    dispatch({ type: RECEIVED_LEAGUES, leagues });
  });
};
