import { RECEIVED_SPORTS } from '../utils/Constants';

export const requestSports = () => (dispatch) => {
  fetch('/api/sports').then(res => res.json()).then((sports) => {
    dispatch({ type: RECEIVED_SPORTS, sports });
  });
};
