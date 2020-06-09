import React from "react";
import ReactDOM from "react-dom";
import createSagaMiddleware from "redux-saga";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import { helloSaga } from "./sagas";
import "./index.css";
import App from "./App";
import reducer from "./reducer";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(helloSaga)
export const { dispatch } = store;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
