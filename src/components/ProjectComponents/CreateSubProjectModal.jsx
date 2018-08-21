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
class CreateSubProjectModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.initialState = {
      Type: "",
      SubType: "",
      Name: "",
      Status: "",
      Author: ""
    };
    this.state = Object.assign({}, this.initialState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && nextProps.modalMode !== "create") {
      this.populateData(nextProps.selectedSubProject);
    } else if (!nextProps.open && this.props.open) {
      this.cleanState();
    }
  }

  populateData = program => {
    this.setState({
      Type: program.type,
      Status: program.status,
      Author: program.author,
      SubType: program.subType,
      Name: program.name
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
      this.props.onSubmit(
        submitState,
        this.props.selectedSubProject.id,
        this.props.selectedProject.id
      );
    } else {
      submitState.ProjectRID = this.props.selectedProject.id;
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
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="Type">Type</InputLabel>
              <Select
                value={this.state.Type}
                name={"Type"}
                onChange={this.handleChange}
              >
                <MenuItem value={"Compliance"}>Compliance</MenuItem>
                <MenuItem value={"FMEA"}>FMEA</MenuItem>
                <MenuItem value={"STPA"}>STPA</MenuItem>
                <MenuItem value={"Funtional Safety"}>Funtional Safety</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="Type">SubType</InputLabel>
              <Select
                value={this.state.SubType}
                name={"SubType"}
                onChange={this.handleChange}
              >
                <MenuItem value={"Functional Architecture"}>
                  Functional Architecture
                </MenuItem>
                <MenuItem value={"Physical Architecture"}>
                  Physical Architecture
                </MenuItem>
                <MenuItem value={"FMEA"}>FMEA</MenuItem>
                <MenuItem value={"STPA"}>STPA</MenuItem>
                <MenuItem value={"Funtional Safety"}>Funtional Safety</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="name"
              name="Name"
              label="Name"
              type="text"
              fullWidth
              value={this.state.Name}
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
              id="status"
              name="Status"
              label="Status"
              type="text"
              fullWidth
              value={this.state.Status}
              onChange={this.handleChange}
            />
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

CreateSubProjectModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateSubProjectModal);
