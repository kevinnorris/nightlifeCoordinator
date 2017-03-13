import {getUser, getClicks, getToken} from '../../util/localStorage';
// for debugging
/* localStorage.removeItem('full-test-token');
localStorage.removeItem('full-test-user');*/

export const initialAuthState = {
  token: getToken(),
  user: getUser(),
};

export const initialClicksState = {
  isFetching: false,
  clicks: getClicks(),
  error: null,
};
