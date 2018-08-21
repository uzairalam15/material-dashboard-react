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
      Detection: 0,
      DetectionRationale: "",
      Occurrence: 0,
      OccurrenceRationale: "",
      Category: ""
    };
    this.state = Object.assign({}, this.initialState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && nextProps.modalMode !== "create") {
      this.populateData(nextProps.selectedFailureCause);
    } else if (!nextProps.open && this.props.open) {
      this.cleanState();
    }
  }

  populateData = program => {
    this.setState({
      ID: program.name,
      Status: program.status,
      Author: program.author,
      Detection: program.detection,
      DetectionRationale: program.detectionRationale,
      Occurrence: program.occurrence,
      OccurrenceRationale: program.occurrenceRationale,
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
      this.props.onSubmit(submitState, this.props.selectedFailureCause.id);
    } else {
      submitState.FailureModeRID = this.props.selectedFailureMode.id;
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
            <TextField
              margin="dense"
              id="Detection"
              name="Detection"
              label="Detection"
              type="number"
              fullWidth
              value={this.state.Detection}
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              id="DetectionRationale"
              name="DetectionRationale"
              label="Detection Control"
              type="text"
              fullWidth
              value={this.state.DetectionRationale}
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              id="Occurrence"
              name="Occurrence"
              label="Occurrence"
              type="number"
              fullWidth
              value={this.state.Occurrence}
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              id="OccurrenceRationale"
              name="OccurrenceRationale"
              label="Occurrence Rationale"
              type="text"
              fullWidth
              value={this.state.OccurrenceRationale}
              onChange={this.handleChange}
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="Category">Category</InputLabel>
              <Select
                value={this.state.Category}
                name={"Category"}
                onChange={this.handleChange}
              >
                <MenuItem value={"Sub system Failure"}>
                  Sub system Failure
                </MenuItem>
                <MenuItem value={"Sensitivity to Noise"}>
                  Sensitivity to Noise
                </MenuItem>
                <MenuItem value={"Weakness of Interface"}>
                  Weakness of Interface
                </MenuItem>
                <MenuItem value={"Weakness of Specification"}>
                  Weakness of Specification
                </MenuItem>
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
