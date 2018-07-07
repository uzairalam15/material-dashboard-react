/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import throttle from "lodash/throttle";
// import {
//   getStoreFromLocalStorage,
//   saveStoreToLocalStorage,
//   getAuthData
// } from "../utils/storeStorage";

export const history = createHistory();
function configureStoreProd(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [thunk, reactRouterMiddleware];

  // const existedStore = getStoreFromLocalStorage();
  // const updatedState = Object.assign({}, initialState, existedStore);

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );

  // store.subscribe(
  //   throttle(() => {
  //     saveStoreToLocalStorage(getAuthData(store.getState()));
  //   }, 1000)
  // );
  return store;
}

function configureStoreDev(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);

  const middlewares = [thunk, reactRouterMiddleware];
  // add support for Redux dev tools
  // const existedStore = getStoreFromLocalStorage();
  // const updatedState = Object.assign({}, initialState, existedStore);
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  // store.subscribe(
  //   throttle(() => {
  //     saveStoreToLocalStorage(getAuthData(store.getState()));
  //   }, 1000)
  // );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers/rootReducer", () => {
      const nextReducer = require("../reducers/rootReducer").default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

const configureStore =
  process.env.NODE_ENV === "production"
    ? configureStoreProd
    : configureStoreDev;

export default configureStore;
