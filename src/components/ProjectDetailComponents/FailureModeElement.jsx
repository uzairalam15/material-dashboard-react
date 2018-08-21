import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Grid from "@material-ui/core/Grid";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import CreateFailureModeModal from "./modals/CreateFailureModeModal.jsx";
import FailureModeTasks from "./FailureModeTasks.jsx";

import {
  getFailureModesAction,
  createFailureModeAction,
  updateFailureModeAction,
  deleteFailureModeAction
} from "actions/FailureModeActions";

import { clearMode } from "actions/SharedActions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    background: "transparent"
  },
  formControl: {
    width: "100%"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  expansionContent: {
    margin: "0px 0px"
  },
  expansionExpandIcon: {
    zIndex: 1000,
    color: "white",
    fontWeight: 500
  },
  expansionDetailRoot: {
    padding: 0
  }
});

class FailureModeElement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      modal: false,
      openIndex: null,
      modalMode: "create",
      selectedFailureMode: {}
    };
  }

  // handleChange = event => {
  //   const value = event.target.value;

  //   this.setState({
  //     functionId: value
  //   });
  // };

  toggleFailureModeModal = (e, mode = "create", outputItem = {}) => {
    this.setState({
      modal: !this.state.modal,
      modalMode: mode,
      selectedFailureMode: outputItem
    });
  };

  populateFailureModeAction = () => {
    if (this.state.modalMode === "create") {
      return this.props.createFailureModeAction;
    }
    return this.props.updateFailureModeAction;
  };

  getFailureModeElements = failureModes => {
    if (failureModes.length) {
      return failureModes.map((output, index) => {
        return (
          <FailureModeTasks
            item={output}
            index={index}
            openIndex={this.state.openIndex}
            updateIndex={passedIndex => {
              this.props.clearMode();
              this.setState({ openIndex: passedIndex });
            }}
            deleteFailureMode={this.props.deleteFailureModeAction}
            toggleFailureModeModal={this.toggleFailureModeModal}
          />
        );
      });
    }
    return <h5 style={{ textAlign: "center" }}>No Failure Modes</h5>;
  };

  render() {
    const { classes, item, failureModes } = this.props;
    const { open } = this.state;
    return (
      <GridItem xs={12} sm={12} md={12}>
        <CardBody style={{ padding: 0, paddingBottom: 20 }}>
          <Grid container>
            <GridItem xs={12} sm={12} md={12} style={{ textAlign: "right" }}>
              <Button
                variant="extendedFab"
                aria-label="delete"
                color="primary"
                className={classes.button}
                onClick={this.toggleFailureModeModal}
              >
                <AddIcon className={classes.extendedIcon} />
                Create Failure Mode
              </Button>
            </GridItem>
          </Grid>
          {this.getFailureModeElements(failureModes)}
        </CardBody>
        <CreateFailureModeModal
          title={`${this.state.modalMode.toUpperCase()} Failure Mode`}
          open={this.state.modal}
          modalMode={this.state.modalMode}
          selectedOutput={this.props.item}
          selectedFailureMode={this.state.selectedFailureMode}
          handleClose={this.toggleFailureModeModal}
          onSubmit={this.populateFailureModeAction()}
        />
      </GridItem>
    );
  }
}

FailureModeElement.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  failureModes: state.projectDetailReducer.failureModes,
  functions: state.projectDetailReducer.functions
});

export default connect(
  mapStateToProps,
  {
    getFailureModesAction,
    createFailureModeAction,
    updateFailureModeAction,
    deleteFailureModeAction,
    clearMode
  }
)(withStyles(styles)(FailureModeElement));
