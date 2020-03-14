import { ActionTypes } from "../actions/users";

const initialState = {
  entities: [],
  error: null,
  isLoading: false,
};

export default (state = initialState, action = {}) => {
  const { type, error, payload} = action;
  switch (type) {      
      case ActionTypes.USERS_FETCH:
        return {
          ...state,
          isLoading: true,
        }

      case ActionTypes.USERS_FETCHED:
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

