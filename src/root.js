import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import indexRoutes from "routes/index.jsx";

const Root = props => {
  const { store, history } = props;
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return (
              <Route
                path={prop.path}
                exact={true}
                component={prop.component}
                key={key}
              />
            );
          })}
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Root;
