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

class CreateFailureModeModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.initialState = {
      ID: "",
      Status: "",
      Author: "",
      Category: ""
    };
    this.state = Object.assign({}, this.initialState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && nextProps.modalMode !== "create") {
      this.populateData(nextProps.selectedNoiseFactor);
    } else if (!nextProps.open && this.props.open) {
      this.cleanState();
    }
  }

  populateData = program => {
    this.setState({
      ID: program.name,
      Status: program.status,
      Author: program.author,
      Category: program.category
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
      this.props.onSubmit(submitState, this.props.selectedNoiseFactor.id);
    } else {
      submitState.FailureCauseRID = this.props.selectedFailureCause.id;
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
              <InputLabel htmlFor="Category">Category</InputLabel>
              <Select
                value={this.state.Category}
                name={"Category"}
                onChange={this.handleChange}
              >
                <MenuItem value={"Enviourment"}>Enviourment</MenuItem>
                <MenuItem value={"User Interaction"}>User Interaction</MenuItem>
                <MenuItem value={"Change Over Time"}>Change Over Time</MenuItem>
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

export default withStyles(styles)(CreateFailureModeModal);
