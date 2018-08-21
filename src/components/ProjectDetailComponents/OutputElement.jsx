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
import CreateOutputModal from "./modals/CreateInputModal";
import OutputTasks from "./OutputTasks.jsx";

import { getFailureModesAction } from "actions/FailureModeActions";

import {
  getOutputsAction,
  createOutputAction,
  updateOutputAction,
  deleteOutputAction
} from "actions/OutputActions";
import { clearOutput } from "actions/SharedActions";

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

class OutputElement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      modal: false,
      openIndex: null,
      functionId: "",
      modalMode: "create",
      selectedOutput: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.openIndex !== nextProps.openIndex) {
      this.setState({
        open: false,
        functionId: null,
        modal: false
      });
    }
  }

  toggleRow = () => {
    this.setState({
      open: !this.state.open
    });
  };

  getFunctionItems = functions => {
    return functions.map(functionItem => {
      return (
        <MenuItem value={functionItem.id}>
          {functionItem.id}-{functionItem.name}
        </MenuItem>
      );
    });
  };

  handleChange = event => {
    const value = event.target.value;
    if (this.state.functionId !== value && value) {
      this.props.getOutputsAction(value);
    }
    this.setState({
      functionId: value,
      openIndex: null
    });
  };

  toggleOutputModal = (e, mode = "create", outputItem = {}) => {
    if (this.state.functionId) {
      this.setState({
        modal: !this.state.modal,
        modalMode: mode,
        selectedOutput: outputItem
      });
    }
  };

  populateOutputAction = () => {
    if (this.state.modalMode === "create") {
      return this.props.createOutputAction;
    }
    return this.props.updateOutputAction;
  };

  getOutputElements = outputs => {
    if (outputs.length) {
      return outputs.map((output, index) => {
        return (
          <OutputTasks
            item={output}
            index={index}
            openIndex={this.state.openIndex}
            updateIndex={passedIndex => {
              this.props.clearOutput();
              this.setState({ openIndex: passedIndex });
            }}
            deleteOutput={this.props.deleteOutputAction}
            toggleOutputModal={this.toggleOutputModal}
            getFailureModesAction={this.props.getFailureModesAction}
          />
        );
      });
    }
    return <h5 style={{ textAlign: "center" }}>No Outputs</h5>;
  };

  render() {
    const { classes, item, outputs, functions } = this.props;
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
            <CardHeader style={{ width: "100%", margin: 6 }} color="info">
              <Grid container>
                <GridItem xs={12} lg={12} md={12} style={{ paddingLeft: 0 }}>
                  <h4 className={classes.cardTitleWhite}>Outputs</h4>
                  <p className={classes.cardCategoryWhite}>
                    Expand to outputs and its dependent elements
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
                <GridItem xs={6} sm={6} md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="functionId">
                      Select Function
                    </InputLabel>
                    <Select
                      value={this.state.functionId}
                      id={"functionId"}
                      name={"functionId"}
                      onChange={this.handleChange}
                    >
                      {this.getFunctionItems(functions)}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={6} sm={6} md={6} style={{ textAlign: "right" }}>
                  <Button
                    variant="extendedFab"
                    aria-label="delete"
                    color="primary"
                    className={classes.button}
                    onClick={this.toggleOutputModal}
                  >
                    <AddIcon className={classes.extendedIcon} />
                    Create Output
                  </Button>
                </GridItem>
              </Grid>
              {this.getOutputElements(outputs)}
            </CardBody>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <CreateOutputModal
          title={`${this.state.modalMode.toUpperCase()} Output`}
          open={this.state.modal}
          modalMode={this.state.modalMode}
          selectedFunction={this.state.functionId}
          selectedInput={this.state.selectedOutput}
          handleClose={this.toggleOutputModal}
          onSubmit={this.populateOutputAction()}
        />
      </GridItem>
    );
  }
}

OutputElement.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  outputs: state.projectDetailReducer.outputs,
  functions: state.projectDetailReducer.functions
});

export default connect(
  mapStateToProps,
  {
    getOutputsAction,
    createOutputAction,
    updateOutputAction,
    deleteOutputAction,
    getFailureModesAction,
    clearOutput
  }
)(withStyles(styles)(OutputElement));
