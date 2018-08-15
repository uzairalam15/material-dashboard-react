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
import FunctionGrid from "components/FunctionExpansionRows/FunctionGrid";
import InputGrid from "components/InputExpansionRows/InputGrid";
import OutputGrid from "components/OutputExpansionRows/OutputGrid";
import FailureModeGrid from "components/FailureModeExpansionRows/FailureModeGrid";
import CreateFunctionModal from "components/ProjectModals/CreateFunctionModal";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import CreateInputOutputModal from "components/ProjectModals/CreateInputOutputModal";
import CreateFailureModeModal from "components/ProjectModals/CreateFailureModeModal";
import {
  getFunctionsAction,
  getFunctionsSuccess,
  getSubFunctionsAction,
  getSubFunctionsSuccess,
  createFunctionAction,
  createSubFunctionAction
} from "actions/FunctionActions";
import {
  createInputAction,
  createOutputAction,
  getInputsAction,
  getOutputsAction,
  getFailureModesAction,
  createFailureModeAction,
  createFailureCauseAction,
  createFailureEffectAction,
  getFailureCausesAction,
  getFailureEffectsAction
} from "actions/ProjectActions";

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
      globalFunctionId: "",
      functionModal: false,
      inputModal: false,
      outputModal: false,
      failureModal: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.project.id) {
      this.props.history.push("/projects");
    }
  }

  setGlobalFunctionId = id => {
    this.setState({
      globalFunctionId: id
    });
  };

  toggleCreateFunctionModal = () => {
    this.setState({
      functionModal: !this.state.functionModal
    });
  };

  createFunction = data => {
    this.props.createFunctionAction(
      Object.assign({}, data, {
        SubProjectRID: this.props.project.id
      })
    );
    this.toggleCreateFunctionModal();
  };

  componentDidMount() {
    if (!this.props.project.id) {
      this.props.history.push("/projects");
    }
  }

  render() {
    const {
      classes,
      project,
      functions,
      inputs,
      outputs,
      failureModes,
      loader
    } = this.props;
    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>
                Project: {project.name}
              </h4>
              <p className={classes.cardCategoryWhite}>
                Select component from tab to create or update
              </p>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomTabs
                    title="Components:"
                    headerColor="info"
                    tabs={[
                      {
                        tabName: "Function",
                        tabContent: (
                          <FunctionGrid
                            data={functions}
                            getSubFunctions={this.props.getSubFunctionsAction}
                            toggleCreateFunctionModal={
                              this.toggleCreateFunctionModal
                            }
                            createSubFunction={
                              this.props.createSubFunctionAction
                            }
                          />
                        )
                      },
                      {
                        tabName: "Input",
                        tabContent: (
                          <InputGrid
                            data={inputs}
                            functions={functions}
                            loader={loader}
                            globalFunctionId={this.state.globalFunctionId}
                            setGlobalFunctionId={this.setGlobalFunctionId}
                            getInputs={this.props.getInputsAction}
                            createInputAction={this.props.createInputAction}
                          />
                        )
                      },
                      {
                        tabName: "Output",
                        tabContent: (
                          <OutputGrid
                            data={outputs}
                            functions={functions}
                            loader={loader}
                            globalFunctionId={this.state.globalFunctionId}
                            setGlobalFunctionId={this.setGlobalFunctionId}
                            getOutputs={this.props.getOutputsAction}
                            createOutputAction={this.props.createOutputAction}
                          />
                        )
                      },
                      {
                        tabName: "Failure Mode",
                        tabContent: (
                          <FailureModeGrid
                            data={failureModes}
                            outputs={outputs}
                            globalFunctionId={this.state.globalFunctionId}
                            createFailureCause={
                              this.props.createFailureCauseAction
                            }
                            createFailureMode={
                              this.props.createFailureModeAction
                            }
                            createFailureEffect={
                              this.props.createFailureEffectAction
                            }
                            getFailureCauses={this.props.getFailureCausesAction}
                            getFailureEffects={
                              this.props.getFailureEffectsAction
                            }
                            getFailureModes={this.props.getFailureModesAction}
                            loader={this.props.loader}
                          />
                        )
                      }
                    ]}
                  />
                </GridItem>
              </Grid>
            </CardBody>
          </Card>
        </GridItem>

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
  failureModes: state.projectDetailReducer.failureModes,
  functions: state.projectDetailReducer.functions,
  inputs: state.projectDetailReducer.inputs,
  outputs: state.projectDetailReducer.outputs,
  loader: state.projectDetailReducer.loader
});

export default connect(
  mapStateToProps,
  {
    getFunctionsAction,
    getInputsAction,
    getOutputsAction,
    getFunctionsSuccess,
    getSubFunctionsAction,
    getSubFunctionsSuccess,
    createFunctionAction,
    createSubFunctionAction,
    createInputAction,
    createOutputAction,
    getFailureModesAction,
    createFailureModeAction,
    createFailureCauseAction,
    createFailureEffectAction,
    getFailureCausesAction,
    getFailureEffectsAction
  }
)(withStyles(styles)(ProjectDetail));
