import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

// core components
import GridItem from "components/Grid/GridItem.jsx";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: "95%"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class ItemSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      functionId: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { item, classes } = this.props;
    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="functionId">Select Function</InputLabel>
            <Select
              value={this.state.functionId}
              name={"functionId"}
              onChange={this.handleChange}
            >
              <MenuItem value={"Approved"}>Approved</MenuItem>
              <MenuItem value={"Proposed"}>Proposed</MenuItem>
              <MenuItem value={"Rejected"}>Rejected</MenuItem>
            </Select>
          </FormControl>
        </GridItem>
      </Grid>
    );
  }
}

export default withStyles(styles)(ItemSelect);
