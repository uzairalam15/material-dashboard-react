import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";
import NavigationIcon from "@material-ui/icons/Navigation";
// child componenets
import FunctionExpansionRows from "components/FunctionExpansionRows/ExpansionRows";
import InputExpansionRows from "components/InputExpansionRows/ExpansionRows";
import OutputExpansionRows from "components/OutputExpansionRows/ExpansionRows";
import CreateFunctionModal from "components/ProjectModals/CreateFunctionModal";
import CreateInputOutputModal from "components/ProjectModals/CreateInputOutputModal";
import {
  getFunctionsAction,
  getFunctionsSuccess,
  getSubFunctionsAction,
  getSubFunctionsSuccess,
  createFunctionAction,
  createSubFunctionAction
} from "actions/FunctionActions";
import { createInputAction, createOutputAction } from "actions/ProjectActions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
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
  }
});

class ProjectDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      functionModal: false,
      inputModal: false,
      outputModal: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.project.id) {
      this.props.history.push("/projects");
    }
  }

  toggleCreateFunctionModal = () => {
    this.setState({
      functionModal: !this.state.functionModal
    });
  };

  toggleCreateInputModal = () => {
    this.setState({
      inputModal: !this.state.inputModal
    });
  };

  toggleCreateOutputModal = () => {
    this.setState({
      outputModal: !this.state.outputModal
    });
  };

  createFunction = data => {
    this.props.createFunctionAction(
      Object.assign({}, data, {
        SubProjectRID: this.props.project.id
      })
    );
  };

  ioSubmit = (data, mode) => {
    if (mode === "input") {
      this.props.createInputAction(data);
      this.toggleCreateInputModal();
    } else {
      this.props.createOutputAction(data);
      this.toggleCreateOutputModal();
    }
  };

  componentDidMount() {
    if (!this.props.project.id) {
      this.props.history.push("/projects");
    }
  }

  render() {
    const { classes, project, functions, inputs, outputs } = this.props;
    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Project: {project.name}
              </h4>
              <p className={classes.cardCategoryWhite}>
                list of functions, inputs and outputs of project
              </p>
            </CardHeader>
            <CardBody>
              <Grid>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Functions</h4>
                    <p className={classes.cardCategoryWhite}>
                      list of functions, and their sub-functions
                    </p>
                  </CardHeader>
                  <CardBody>
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
                        onClick={this.toggleCreateFunctionModal}
                      >
                        <AddIcon
                          className={classes.extendedIcon}
                          onClick={this.toggleCreateFunctionModal}
                        />
                        Create Function
                      </Button>
                      <Table
                        tableHeaderColor="primary"
                        customRows={
                          <FunctionExpansionRows
                            data={functions}
                            getSubFunctions={this.props.getSubFunctionsAction}
                            createSubFunction={
                              this.props.createSubFunctionAction
                            }
                          />
                        }
                      />
                    </GridItem>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Inputs</h4>
                    <p className={classes.cardCategoryWhite}>list of inputs</p>
                  </CardHeader>
                  <CardBody>
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
                        onClick={this.toggleCreateInputModal}
                      >
                        <AddIcon className={classes.extendedIcon} />
                        Create Input
                      </Button>
                      {inputs.length ? (
                        <Table
                          tableHeaderColor="primary"
                          customRows={<InputExpansionRows data={inputs} />}
                        />
                      ) : (
                        <h5 style={{ textAlign: "left" }}>No Inputs</h5>
                      )}
                    </GridItem>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Outputs</h4>
                    <p className={classes.cardCategoryWhite}>list of outputs</p>
                  </CardHeader>
                  <CardBody>
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
                        onClick={this.toggleCreateOutputModal}
                      >
                        <AddIcon className={classes.extendedIcon} />
                        Create Output
                      </Button>
                      {outputs.length ? (
                        <Table
                          tableHeaderColor="primary"
                          customRows={<OutputExpansionRows data={outputs} />}
                        />
                      ) : (
                        <h5 style={{ textAlign: "left" }}>No Outputs</h5>
                      )}
                    </GridItem>
                  </CardBody>
                </Card>
              </Grid>
            </CardBody>
          </Card>
        </GridItem>
        <CreateInputOutputModal
          functions={this.props.functions}
          title={this.state.inputModal ? "Create Input" : "Create Output"}
          open={this.state.inputModal || this.state.outputModal}
          mode={this.state.inputModal ? "input" : "output"}
          handleClose={
            this.state.inputModal
              ? this.toggleCreateInputModal
              : this.toggleCreateOutputModal
          }
          onSubmit={this.ioSubmit}
        />
        <CreateFunctionModal
          title={"Create Function"}
          open={this.state.functionModal}
          handleClose={this.toggleCreateFunctionModal}
          onSubmit={this.createFunction}
        />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  project: state.projectDetailReducer.project,
  functions: state.projectDetailReducer.functions,
  inputs: state.projectDetailReducer.inputs,
  outputs: state.projectDetailReducer.outputs
});

export default connect(
  mapStateToProps,
  {
    getFunctionsAction,
    getFunctionsSuccess,
    getSubFunctionsAction,
    getSubFunctionsSuccess,
    createFunctionAction,
    createSubFunctionAction,
    createInputAction,
    createOutputAction
  }
)(withStyles(styles)(ProjectDetail));
