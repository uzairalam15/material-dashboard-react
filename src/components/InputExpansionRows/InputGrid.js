import React, { PureComponent } from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
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
import InputExpansionRows from "./ExpansionRows";
import CreateInputOutputModal from "components/ProjectModals/CreateInputOutputModal";
import Loader from "components/Loader";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  formControl: {
    minWidth: "50%",
    textAlign: "left"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class InputGrid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      functionId: this.props.globalFunctionId || "",
      modal: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.globalFunctionId !== nextProps.globalFunctionId) {
      this.setState({ functionId: nextProps.globalFunctionId });
    }
  }

  componentDidMount() {
    if (this.props.globalFunctionId && !this.props.data.length) {
      this.props.getInputs(this.props.globalFunctionId);
    }
  }

  onSubmit = data => {
    this.props.createInputAction(
      Object.assign({}, data, {
        FunctionRID: this.state.functionId
      })
    );
    this.toggleCreateModeModal();
  };

  toggleCreateModeModal = () => {
    this.setState({
      modal: !this.state.modal
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
      this.props.getInputs(value);
      this.props.setGlobalFunctionId(value);
    }
  };

  getOtherDiv = loader => {
    return loader ? (
      <Loader />
    ) : (
      <h3 style={{ textAlign: "left" }}>No Inputs</h3>
    );
  };

  render() {
    const noDataText = <h3 style={{ textAlign: "left" }}>No Inputs</h3>;
    const { classes, data, loader, functions } = this.props;
    return (
      <GridItem xs={12} sm={12} md={12} style={{ textAlign: "right" }}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="functionId">Select Function</InputLabel>
          <Select
            value={this.state.functionId}
            id={"functionId"}
            name={"functionId"}
            onChange={this.handleChange}
          >
            {this.getFunctionItems(functions)}
          </Select>
        </FormControl>
        <Button
          variant="extendedFab"
          aria-label="delete"
          color="primary"
          disabled={!!this.props.functionId}
          className={classes.button}
          onClick={this.toggleCreateModeModal}
        >
          <AddIcon
            className={classes.extendedIcon}
            onClick={this.toggleCreateModeModal}
          />
          Create Input
        </Button>
        {data.length ? (
          <Table
            tableHeaderColor="primary"
            customRows={<InputExpansionRows {...this.props} />}
          />
        ) : (
          this.getOtherDiv(loader)
        )}
        <CreateInputOutputModal
          title={"Create Input"}
          open={this.state.modal}
          handleClose={this.toggleCreateModeModal}
          onSubmit={this.onSubmit}
        />
      </GridItem>
    );
  }
}

export default withStyles(styles)(InputGrid);
