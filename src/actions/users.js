/**
 * Users actions
 */
import { request } from '../api';

/**
 * Users action types
 */
const ActionTypes = {
  USERS_FETCH: 'USERS_FETCH',
  USERS_FETCHED: 'USERS_FETCHED'
};

const PER_PAGE = 10;

/**
 * User entity fetch completed action
 */
const usersFetched = (payload = [], error = null) => ({
  type: ActionTypes.USERS_FETCHED,
  payload,
  error,
});

/**
 * Trigger user collection API call
 */
const usersFetch = (params = {}) => (dispatch) => {
  const data = {
    ...params,
    count: PER_PAGE,
  };
  return request({
    method: "get",
    url:"users",
    data,
  })
    .then(
      ({ data, headers }) => {

        /**
         * Update user list in the store
         */
        dispatch(usersFetched(data));
      },
      (error) => dispatch(usersFetched([], error)),
    );
};

const RECEIVE_TWEETS = "RECEIVE_TWEETS";
const TOGGLE_TWEET = "TOGGLE_TWEET";
const ADD_TWEET = "ADD_TWEET";

const RECEIVE_USERS = "RECEIVE_USERS";

const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users
  };
}

export {
  ActionTypes,
  usersFetch,
  usersFetched,
  RECEIVE_TWEETS,
  TOGGLE_TWEET,
  ADD_TWEET,
  RECEIVE_USERS,
  receiveUsers
};


