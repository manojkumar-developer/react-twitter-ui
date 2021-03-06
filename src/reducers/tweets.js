import { ActionTypes } from "../actions/tweets";

const initialState = {
  entities: [],
  error: null,
  isLoading: false,
};

export default (state = initialState, action = {}) => {
  const { type, error, payload} = action;
  switch (type) {      
      case ActionTypes.TWEETS_FETCH:
        return {
          ...state,
          isLoading: true,
        }

      case ActionTypes.TWEETS_FETCHED:
        return {
          ...state,
          error,
          entities: payload.slice(),
          isLoading: false,
        }

      default:
        return {
          ...state,
        }
  }
};

