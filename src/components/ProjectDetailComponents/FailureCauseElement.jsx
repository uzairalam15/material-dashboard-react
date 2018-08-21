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
import CreateFailureCauseModal from "./modals/CreateFailureCauseModal.jsx";
import FailureCauseTasks from "./FailureCauseTasks.jsx";

import {
  getFailureCausesAction,
  createFailureCauseAction,
  updateFailureCauseAction,
  deleteFailureCauseAction
} from "actions/FailureCauseActions";

import { clearCause } from "actions/SharedActions";

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

class FailureCauseElement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      modal: false,
      openIndex: null,
      modalMode: "create",
      selectedFailureCause: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.openIndex) {
      this.setState({
        open: false
      });
    }
  }

  toggleRow = () => {
    if (!this.state.open) {
      this.props.getFailureCausesAction(this.props.item.id);
    }
    this.setState({
      open: !this.state.open
    });
  };

  // handleChange = event => {
  //   const value = event.target.value;

  //   this.setState({
  //     functionId: value
  //   });
  // };

  toggleFailureCauseModal = (e, mode = "create", outputItem = {}) => {
    this.setState({
      modal: !this.state.modal,
      modalMode: mode,
      selectedFailureCause: outputItem
    });
  };

  populateFailureCauseAction = () => {
    if (this.state.modalMode === "create") {
      return this.props.createFailureCauseAction;
    }
    return this.props.updateFailureCauseAction;
  };

  getFailureCauseElements = failureCauses => {
    if (failureCauses.length) {
      return failureCauses.map((output, index) => {
        return (
          <FailureCauseTasks
            item={output}
            index={index}
            openIndex={this.state.openIndex}
            updateIndex={passedIndex => {
              this.props.clearCause();
              this.setState({ openIndex: passedIndex });
            }}
            deleteFailureCause={this.props.deleteFailureCauseAction}
            toggleFailureCauseModal={this.toggleFailureCauseModal}
          />
        );
      });
    }
    return <h5 style={{ textAlign: "center" }}>No FailureCauses</h5>;
  };

  render() {
    const { classes, item, failureCauses } = this.props;
    const { open } = this.state;
    return (
      <GridItem xs={12} sm={12} md={12}>
        <ExpansionPanel expanded={open} onChange={this.toggleRow}>
          <ExpansionPanelSummary
            classes={{
              content: classes.expansionContent,
              expandIcon: classes.expansionExpandIcon
            }}
            style={{ padding: 0, margin: 0 }}
            IconButtonProps={{ style: { zIndex: 1000 } }}
            expandIcon={<ExpandMoreIcon />}
          >
            <CardHeader style={{ width: "100%", margin: 6 }} color="danger">
              <Grid container>
                <GridItem xs={12} lg={12} md={12} style={{ paddingLeft: 0 }}>
                  <h4 className={classes.cardTitleWhite}>FailureCauses</h4>
                  <p className={classes.cardCategoryWhite}>
                    Expand to failureCauses and its dependent elements
                  </p>
                </GridItem>
              </Grid>
            </CardHeader>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            classes={{
              root: classes.expansionDetailRoot
            }}
          >
            <CardBody style={{ padding: 0, paddingBottom: 20 }}>
              <Grid container>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ textAlign: "right" }}
                >
                  <Button
                    variant="extendedFab"
                    aria-label="delete"
                    color="primary"
                    className={classes.button}
                    onClick={this.toggleFailureCauseModal}
                  >
                    <AddIcon className={classes.extendedIcon} />
                    Create Failure Cause
                  </Button>
                </GridItem>
              </Grid>
              {this.getFailureCauseElements(failureCauses)}
            </CardBody>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <CreateFailureCauseModal
          title={`${this.state.modalMode.toUpperCase()} FailureCause`}
          open={this.state.modal}
          modalMode={this.state.modalMode}
          selectedFailureMode={this.props.item}
          selectedFailureCause={this.state.selectedFailureCause}
          handleClose={this.toggleFailureCauseModal}
          onSubmit={this.populateFailureCauseAction()}
        />
      </GridItem>
    );
  }
}

FailureCauseElement.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  failureCauses: state.projectDetailReducer.failureCauses,
  functions: state.projectDetailReducer.functions
});

export default connect(
  mapStateToProps,
  {
    getFailureCausesAction,
    createFailureCauseAction,
    updateFailureCauseAction,
    deleteFailureCauseAction,
    clearCause
  }
)(withStyles(styles)(FailureCauseElement));
