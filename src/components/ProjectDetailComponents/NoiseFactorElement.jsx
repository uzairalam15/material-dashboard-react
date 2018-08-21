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
import CreateNoiseFactorModal from "./modals/CreateNoiseFactorModal.jsx";
import NoiseFactorTasks from "./NoiseFactorTasks.jsx";

import {
  getNoiseFactorsAction,
  createNoiseFactorAction,
  updateNoiseFactorAction,
  deleteNoiseFactorAction
} from "actions/NoiseFactorActions";

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

class NoiseFactorElement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      modal: false,
      modalMode: "create",
      selectedNoiseFactor: {}
    };
  }

  componentDidMount() {
    this.props.getNoiseFactorsAction(this.props.item.id);
  }

  toggleNoiseFactorModal = (e, mode = "create", outputItem = {}) => {
    this.setState({
      modal: !this.state.modal,
      modalMode: mode,
      selectedNoiseFactor: outputItem
    });
  };

  populateNoiseFactorAction = () => {
    if (this.state.modalMode === "create") {
      return this.props.createNoiseFactorAction;
    }
    return this.props.updateNoiseFactorAction;
  };

  getNoiseFactorElements = noiseFactors => {
    if (noiseFactors.length) {
      return noiseFactors.map(output => {
        return (
          <NoiseFactorTasks
            item={output}
            deleteNoiseFactor={this.props.deleteNoiseFactorAction}
            toggleNoiseFactorModal={this.toggleNoiseFactorModal}
          />
        );
      });
    }
    return <h5 style={{ textAlign: "center" }}>No NoiseFactors</h5>;
  };

  render() {
    const { classes, item, noiseFactors } = this.props;
    const { open } = this.state;
    return (
      <GridItem xs={12} sm={12} md={12}>
        <CardBody style={{ padding: 0 }}>
          <Grid container>
            <GridItem xs={12} sm={12} md={12} style={{ textAlign: "right" }}>
              <Button
                variant="extendedFab"
                aria-label="delete"
                color="primary"
                className={classes.button}
                onClick={this.toggleNoiseFactorModal}
              >
                <AddIcon className={classes.extendedIcon} />
                Create
              </Button>
            </GridItem>
          </Grid>
          <NoiseFactorTasks
            items={noiseFactors}
            toggleEditModal={this.toggleNoiseFactorModal}
            deleteNoiseFactor={this.props.deleteNoiseFactorAction}
          />
        </CardBody>
        <CreateNoiseFactorModal
          title={`${this.state.modalMode.toUpperCase()} NoiseFactor`}
          open={this.state.modal}
          modalMode={this.state.modalMode}
          selectedFailureCause={this.props.item}
          selectedNoiseFactor={this.state.selectedNoiseFactor}
          handleClose={this.toggleNoiseFactorModal}
          onSubmit={this.populateNoiseFactorAction()}
        />
      </GridItem>
    );
  }
}

NoiseFactorElement.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  noiseFactors: state.projectDetailReducer.noiseFactors,
  functions: state.projectDetailReducer.functions
});

export default connect(
  mapStateToProps,
  {
    getNoiseFactorsAction,
    createNoiseFactorAction,
    updateNoiseFactorAction,
    deleteNoiseFactorAction
  }
)(withStyles(styles)(NoiseFactorElement));
