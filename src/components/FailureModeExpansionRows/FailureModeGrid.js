import React, { PureComponent } from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Grid from "@material-ui/core/Grid";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";
import NavigationIcon from "@material-ui/icons/Navigation";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

// child componenets
import FailureModeExpansionRows from "./ExpansionRows";
import CreateFailureModeModal from "components/ProjectModals/CreateFailureModeModal";
import Loader from "components/Loader";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  formControl: {
    minWidth: "100%",
    textAlign: "left"
  }
});

class FailureModeGrid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      outputId: "",
      modal: false
    };
  }

  toggleCreateModeModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onSubmit = data => {
    this.props.createFailureMode(
      Object.assign({}, data, {
        OutputRID: this.state.outputId
      })
    );
    this.toggleCreateModeModal();
  };

  getOutputItems = outputs => {
    return outputs.map(outputItem => {
      return (
        <MenuItem value={outputItem.id}>
          {outputItem.id}-{outputItem.name}
        </MenuItem>
      );
    });
  };

  componentDidMount() {
    //this.props.getFailureModes("116:3");
  }

  handleChange = event => {
    const value = event.target.value;
    if (this.state.outputId !== value && value) {
      this.props.getFailureModes(value);
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  };

  getOtherDiv = loader => {
    return loader ? (
      <Loader />
    ) : (
      <h3 style={{ textAlign: "left" }}>No Failure Modes</h3>
    );
  };

  getFunctionName = id => {
    if (id) {
      return `${id}-Function`;
    }
    return "None";
  };

  render() {
    const { classes, data, loader, outputs, globalFunctionId } = this.props;
    return (
      <GridItem xs={12} sm={12} md={12}>
        <Grid container>
          <GridItem xs={4} sm={4} md={4}>
            <p className={classes.paragraph}>
              Function Selected: {this.getFunctionName(globalFunctionId)}
            </p>
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="outputId">Select Output</InputLabel>
              <Select
                value={this.state.outputId}
                id={"outputId"}
                name={"outputId"}
                onChange={this.handleChange}
              >
                {this.getOutputItems(outputs)}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <Button
              variant="extendedFab"
              aria-label="delete"
              color="primary"
              className={classes.button}
              onClick={this.toggleCreateModeModal}
            >
              <AddIcon
                className={classes.extendedIcon}
                onClick={this.toggleCreateModeModal}
              />
              Create Failure Mode
            </Button>
          </GridItem>
        </Grid>
        {data.length ? (
          <Table
            tableHeaderColor="primary"
            customRows={
              <FailureModeExpansionRows
                outputId={this.state.outputId}
                {...this.props}
              />
            }
          />
        ) : (
          this.getOtherDiv(loader)
        )}
        <CreateFailureModeModal
          title={"Create Failure Mode"}
          open={this.state.modal}
          handleClose={this.toggleCreateModeModal}
          onSubmit={this.onSubmit}
        />
      </GridItem>
    );
  }
}

export default withStyles(styles)(FailureModeGrid);
