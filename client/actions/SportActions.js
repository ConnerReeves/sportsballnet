import request from 'superagent';
import { RECEIVED_SPORTS } from '../utils/Constants';

export const requestSports = () => (dispatch) => {
  request
    .get('/api/sports')
    .end((err, res) => {
      dispatch({ type: RECEIVED_SPORTS, sports: res.body });
    });
};
