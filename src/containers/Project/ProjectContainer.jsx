/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Footer from "components/Footer/Footer.jsx";

import projectRoutes from "routes/project.jsx";

import programStyle from "assets/jss/material-dashboard-react/layouts/programStyle.jsx";

import { unsetMessage, getProjectsAction } from "actions/ProjectActions";

const switchRoutes = (
  <Switch>
    {projectRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

const headerRoutes = [
  {
    name: "Programs",
    path: "/programs"
  },
  { name: "Projects", current: true, path: "#" }
];

class ProjectContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    if (!this.props.selectedProgram) {
      this.props.history.push("/programs");
    }
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    const { classes, notification, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={headerRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
          <Snackbar
            place="bl"
            color={notification.color}
            message={notification.message}
            open={!!notification.message}
            autoHideDuration={3000}
            onClose={() => this.props.unsetMessage()}
            closeNotification={() => this.props.unsetMessage()}
            close
          />
          <Footer />
        </div>
      </div>
    );
  }
}

ProjectContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  notification: state.notificationReducer,
  selectedProgram: state.programReducer.selectedProgram
});

export default connect(
  mapStateToProps,
  {
    unsetMessage,
    getProjectsAction
  }
)(withRouter(withStyles(programStyle)(ProjectContainer)));
