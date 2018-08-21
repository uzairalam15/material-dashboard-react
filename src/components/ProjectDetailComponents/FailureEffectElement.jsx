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
import CreateFailureEffectModal from "./modals/CreateFailureEffectModal.jsx";
import FailureEffectTasks from "./FailureEffectTasks.jsx";

import {
  getFailureEffectsAction,
  createFailureEffectAction,
  updateFailureEffectAction,
  deleteFailureEffectAction
} from "actions/FailureEffectActions";

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

class FailureEffectElement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      modal: false,
      modalMode: "create",
      selectedFailureEffect: {}
    };
  }

  toggleRow = () => {
    if (!this.state.open) {
      this.props.getFailureEffectsAction(this.props.item.id);
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

  toggleFailureEffectModal = (e, mode = "create", outputItem = {}) => {
    this.setState({
      modal: !this.state.modal,
      modalMode: mode,
      selectedFailureEffect: outputItem
    });
  };

  populateFailureEffectAction = () => {
    if (this.state.modalMode === "create") {
      return this.props.createFailureEffectAction;
    }
    return this.props.updateFailureEffectAction;
  };

  getFailureEffectElements = failureEffects => {
    if (failureEffects.length) {
      return failureEffects.map(output => {
        return (
          <FailureEffectTasks
            item={output}
            deleteFailureEffect={this.props.deleteFailureEffectAction}
            toggleFailureEffectModal={this.toggleFailureEffectModal}
          />
        );
      });
    }
    return <h5 style={{ textAlign: "center" }}>No FailureEffects</h5>;
  };

  render() {
    const { classes, item, failureEffects } = this.props;
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
                  <h4 className={classes.cardTitleWhite}>FailureEffects</h4>
                  <p className={classes.cardCategoryWhite}>
                    Expand to failureEffects and its dependent elements
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
            <CardBody style={{ padding: 0 }}>
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
                    onClick={this.toggleFailureEffectModal}
                  >
                    <AddIcon className={classes.extendedIcon} />
                    Create
                  </Button>
                </GridItem>
              </Grid>
              <FailureEffectTasks
                items={failureEffects}
                toggleEditModal={this.toggleFailureEffectModal}
                deleteFailureEffect={this.props.deleteFailureEffectAction}
              />
            </CardBody>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <CreateFailureEffectModal
          title={`${this.state.modalMode.toUpperCase()} FailureEffect`}
          open={this.state.modal}
          modalMode={this.state.modalMode}
          selectedFailureMode={this.props.item}
          selectedFailureEffect={this.state.selectedFailureEffect}
          handleClose={this.toggleFailureEffectModal}
          onSubmit={this.populateFailureEffectAction()}
        />
      </GridItem>
    );
  }
}

FailureEffectElement.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  failureEffects: state.projectDetailReducer.failureEffects,
  functions: state.projectDetailReducer.functions
});

export default connect(
  mapStateToProps,
  {
    getFailureEffectsAction,
    createFailureEffectAction,
    updateFailureEffectAction,
    deleteFailureEffectAction
  }
)(withStyles(styles)(FailureEffectElement));
