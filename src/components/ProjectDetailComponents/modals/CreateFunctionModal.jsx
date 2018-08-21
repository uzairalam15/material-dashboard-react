import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  formControl: {
    minWidth: "100%"
  }
});

class CreateFunctionModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.initialState = {
      ID: "",
      Status: "",
      Author: "",
      FMEAStatus: "",
      FunctionSafetyStatus: "",
      STPAStatus: "",
      Lead: ""
    };
    this.state = Object.assign({}, this.initialState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && nextProps.modalMode !== "create") {
      this.populateData(nextProps.selectedFunction);
    } else if (!nextProps.open && this.props.open) {
      this.cleanState();
    }
  }

  populateData = program => {
    this.setState({
      ID: program.name,
      Status: program.status,
      Author: program.author,
      FMEAStatus: program.FMEAStatus,
      FunctionSafetyStatus: program.FunctionSafetyStatus,
      STPAStatus: program.STPAStatus,
      Lead: program.lead
    });
  };

  cleanState = () => {
    this.setState(Object.assign({}, this.initialState));
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = () => {
    const submitState = Object.assign({}, this.state);
    if (this.props.modalMode !== "create") {
      this.props.onSubmit(submitState, this.props.selectedFunction.id);
    } else {
      submitState.ItemRID = this.props.selectedItem.id;
      submitState.SubProjectRID = this.props.selectedItem.id;
      this.props.onSubmit(submitState);
    }
    this.props.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="ID"
              label="Name"
              type="text"
              fullWidth
              value={this.state.ID}
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              id="author"
              name="Author"
              label="Author"
              type="text"
              fullWidth
              value={this.state.Author}
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              id="lead"
              name="Lead"
              label="Lead"
              type="text"
              fullWidth
              value={this.state.Lead}
              onChange={this.handleChange}
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="Status">Status</InputLabel>
              <Select
                value={this.state.Status}
                name={"Status"}
                onChange={this.handleChange}
              >
                <MenuItem value={"Approved"}>Approved</MenuItem>
                <MenuItem value={"Proposed"}>Proposed</MenuItem>
                <MenuItem value={"Rejected"}>Rejected</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="FMEAStatus">FMEAStatus</InputLabel>
              <Select
                value={this.state.FMEAStatus}
                name={"FMEAStatus"}
                onChange={this.handleChange}
              >
                <MenuItem value={"Approved"}>Approved</MenuItem>
                <MenuItem value={"Incomplete"}>Incomplete</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="FunctionSafetyStatus">
                FunctionSafetyStatus
              </InputLabel>
              <Select
                value={this.state.FunctionSafetyStatus}
                name={"FunctionSafetyStatus"}
                onChange={this.handleChange}
              >
                <MenuItem value={"Approved"}>Approved</MenuItem>
                <MenuItem value={"Incomplete"}>Incomplete</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="STPAStatus">STPAStatus</InputLabel>
              <Select
                value={this.state.STPAStatus}
                name={"STPAStatus"}
                onChange={this.handleChange}
              >
                <MenuItem value={"Approved"}>Approved</MenuItem>
                <MenuItem value={"Incomplete"}>Incomplete</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.onSubmit}
              color="primary"
              style={{
                textTransform: "uppercase"
              }}
            >
              {this.props.modalMode}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(CreateFunctionModal);
