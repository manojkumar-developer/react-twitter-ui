import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";

//store stuff
import { createStore } from "redux";
import { Provider } from "react-redux";

//importing the default export from index inside reducers folder
import reducer from "./reducers"; 

//importing middlewares
import middleware from "./middleware";

const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app-root")
);
