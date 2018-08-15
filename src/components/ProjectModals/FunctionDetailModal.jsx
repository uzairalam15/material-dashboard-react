import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  formControl: {
    minWidth: "100%"
  }
});
class FunctionDetailModal extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes, item } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <Grid>
              <GridItem xs={12} md={6} lg={6}>
                <h4>Name</h4>
                <h6>{item && item.name}</h6>
              </GridItem>
            </Grid>
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

FunctionDetailModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FunctionDetailModal);
