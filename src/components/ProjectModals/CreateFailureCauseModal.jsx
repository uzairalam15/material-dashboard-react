import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  formControl: {
    minWidth: "100%"
  }
});
class CreateFailureModeCause extends React.PureComponent {
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
    if (!nextProps.open && this.props.open) {
      this.cleanState();
    }
  }

  cleanState = () => {
    this.setState(Object.assign({}, this.initialState));
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = () => {
    this.props.onSubmit(this.state);
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
              margin="dense"
              id="ID"
              name="ID"
              label="Name"
              type="text"
              fullWidth
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
              id="author"
              name="Author"
              label="Author"
              type="text"
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              id="Detection"
              name="Detection"
              label="Detection"
              type="number"
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              id="DetectionRationale"
              name="DetectionRationale"
              label="DetectionRationale"
              type="text"
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              id="Occurrence"
              name="Occurrence"
              label="Occurrence"
              type="number"
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              id="OccurrenceRationale"
              name="OccurrenceRationale"
              label="OccurrenceRationale"
              type="text"
              fullWidth
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
            <Button onClick={this.onSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

CreateFailureModeCause.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateFailureModeCause);
