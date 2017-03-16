import 'es6-promise/auto';
import 'isomorphic-fetch';

// Actions
const REQUEST_YELP_DATA = 'HOME/REQUEST_YELP_DATA';
const RECIEVED_YELP_DATA = 'HOME/RECIEVED_YELP_DATA';
const ERROR_YELP_DATA = 'ERROR_YELP_DATA';

// Initial State
const initalState = {
  isFetching: false,
  bars: null,
};

// Reducer
export default (state = initalState, action) => {
  switch (action.type) {
    case REQUEST_YELP_DATA:
      return {
        ...state,
        isFetching: true,
      };
    case RECIEVED_YELP_DATA:
      return {
        isFetching: false,
        bars: action.payload.data,
      };
    default:
      return state;
  }
};

// Action Creators
const requestYelpData = () => ({
  type: REQUEST_YELP_DATA,
});

const recievedYelpData = payload => ({
  type: RECIEVED_YELP_DATA,
  payload,
});

const errorYelpData = payload => ({
  type: ERROR_YELP_DATA,
  payload,
});

export const getYelpData = () => (
  (dispatch) => {
    dispatch(requestYelpData());

    return fetch('http://localhost:8080/api/yelpSearchData')
      .then(response => response.json())
      .then((json) => {
        if (json.success) {
          dispatch(recievedYelpData({data: json.data}));
        } else {
          dispatch(errorYelpData({error: json.error}));
        }
      }).catch(err =>
        dispatch(errorYelpData({error: err})),
      );
  }
);
