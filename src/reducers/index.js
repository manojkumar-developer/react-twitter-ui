import { combineReducers } from "redux";

import users from "./users";
import tweets from "./tweets";

import { loadingBarReducer } from "react-redux-loading";

export default combineReducers({
  users,
  tweets,
  loadingBar: loadingBarReducer
});
