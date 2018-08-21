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
import Icon from "@material-ui/core/Icon";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import CreateFunctionModal from "./modals/CreateFunctionModal";
import Tasks from "./FunctionTasks.jsx";

import {
  getFunctionsAction,
  createFunctionAction,
  updateFunctionAction,
  deleteFunctionAction
} from "actions/FunctionActions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    background: "transparent"
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

class FunctionElement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      modal: false,
      modalMode: "create",
      selectedFunction: {}
    };
  }

  toggleRow = () => {
    this.setState({
      open: !this.state.open
    });
  };

  toggleFunctionModal = (e, mode = "create", functionItem = {}) => {
    this.setState({
      modal: !this.state.modal,
      modalMode: mode,
      selectedFunction: functionItem
    });
  };

  populateFunctionAction = () => {
    if (this.state.modalMode === "create") {
      return this.props.createFunctionAction;
    }
    return this.props.updateFunctionAction;
  };

  render() {
    const { classes, item, functions } = this.props;
    const { open } = this.state;
    return (
      <GridItem xs={6} sm={6} md={6}>
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
                  <h4 className={classes.cardTitleWhite}>Functions</h4>
                  <p className={classes.cardCategoryWhite}>
                    Expand to functions and its dependent elements
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
              <GridItem xs={12} sm={12} md={12} style={{ textAlign: "right" }}>
                <Button
                  variant="extendedFab"
                  aria-label="delete"
                  color="primary"
                  className={classes.button}
                  onClick={this.toggleFunctionModal}
                >
                  <AddIcon className={classes.extendedIcon} />
                  Create Function
                </Button>
              </GridItem>
              <Tasks
                items={functions}
                toggleEditModal={this.toggleFunctionModal}
                deleteFunction={this.props.deleteFunctionAction}
              />
            </CardBody>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <CreateFunctionModal
          title={`${this.state.modalMode} Function`}
          open={this.state.modal}
          modalMode={this.state.modalMode}
          selectedItem={this.props.item}
          selectedFunction={this.state.selectedFunction}
          handleClose={this.toggleFunctionModal}
          onSubmit={this.populateFunctionAction()}
        />
      </GridItem>
    );
  }
}

FunctionElement.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  functions: state.projectDetailReducer.functions
});

export default connect(
  mapStateToProps,
  {
    getFunctionsAction,
    createFunctionAction,
    updateFunctionAction,
    deleteFunctionAction
  }
)(withStyles(styles)(FunctionElement));
