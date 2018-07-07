/* eslint-disable import/default */

import React from "react";
import { render } from "react-dom";
import { createBrowserHistory } from "history";
import "assets/css/material-dashboard-react.css?v=1.3.0";
import "assets/css/loader.css";

import injectTapEventPlugin from "react-tap-event-plugin";
import configureStore, { history } from "store/configureStore";
import initialState from "store/initialState";
import Root from "./root";

// require("./images/favicon2.ico");

// import "./styles.scss";
// import "font-awesome/css/font-awesome.css";
// import "flexboxgrid/css/flexboxgrid.css";

injectTapEventPlugin();

const store = configureStore(initialState);

render(
  <Root store={store} history={history} />,
  document.getElementById("root")
);

// import React from "react";
// import ReactDOM from "react-dom";
// import { createBrowserHistory } from "history";
// import { Router, Route, Switch } from "react-router-dom";

// import "assets/css/material-dashboard-react.css?v=1.3.0";

// import indexRoutes from "routes/index.jsx";

// const hist = createBrowserHistory();

// ReactDOM.render(
//   <Router history={hist}>
//     <Switch>
//       {indexRoutes.map((prop, key) => {
//         return <Route path={prop.path} component={prop.component} key={key} />;
//       })}
//     </Switch>
//   </Router>,
//   document.getElementById("root")
// );
