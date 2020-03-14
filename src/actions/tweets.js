/**
 * Tweets actions
 */
import { request } from '../api';

/**
 * Tweets action types
 */
const ActionTypes = {
  TWEETS_FETCH: 'TWEETS_FETCH',
  TWEETS_FETCHED: 'TWEETS_FETCHED'
};

const PER_PAGE = 25;

/**
 * User entity fetch completed action
 */
const tweetsFetched = (payload = [], error = null) => ({
  type: ActionTypes.TWEETS_FETCHED,
  payload,
  error,
});

/**
 * Trigger user collection API call
 */
const tweetsFetch = (params = {}) => (dispatch) => {
  const data = {
    ...params,
    count: PER_PAGE,
  };
  return request({
    method: "get",
    url:"users/tweets",
    data,
  })
    .then(
      ({ data, headers }) => {

        /**
         * Update user list in the store
         */
        dispatch(tweetsFetched(data));
      },
      (error) => dispatch(tweetsFetched([], error)),
    );
};

export {
  ActionTypes,
  tweetsFetch,
  tweetsFetched
};


