import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Update from "@material-ui/icons/Update";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Button from "@material-ui/core/Button";
import CardFooter from "components/Card/CardFooter.jsx";

import programStyle from "assets/jss/material-dashboard-react/views/programStyle.jsx";

class ProgramCardItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  delete = () => {
    this.props.deleteProgram(this.props.item.id);
  };

  gotoProjects = () => {
    this.props.fetchProjects(this.props.item.id);
  };

  toggleModal = () => {
    this.props.toggleModal(null, "update", this.props.item);
  };

  render() {
    const { classes, item } = this.props;
    return (
      <GridItem xs={12} sm={6} md={4}>
        <Card className={classes.programCard}>
          <CardHeader color="success" stats icon>
            <CardIcon color="success">
              <Update />
            </CardIcon>
            <h3 className={classes.cardTitle}>{item.name || "No Name"}</h3>
            <p className={classes.cardCategory}>Author: {item.author}</p>
            <p className={classes.cardCategory}>Status: {item.status}</p>
          </CardHeader>
          <CardFooter stats>
            <div style={{ width: "100%" }} className={classes.stats}>
              <Grid container>
                <Grid item xs={12} lg={6} md={6}>
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={this.gotoProjects}
                  >
                    Show Projects
                  </Button>
                </Grid>
                <Grid
                  item
                  spacing={5}
                  xs={12}
                  lg={6}
                  md={6}
                  style={{
                    textAlign: "right"
                  }}
                >
                  <Button
                    variant="fab"
                    mini
                    color="primary"
                    aria-label="Update"
                    className={classes.button}
                    onClick={this.toggleModal}
                  >
                    <Icon>edit_icon</Icon>
                  </Button>
                  <Button
                    variant="fab"
                    mini
                    color="secondary"
                    aria-label="Update"
                    className={classes.button}
                    onClick={this.delete}
                  >
                    <Icon>highlight_off</Icon>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </CardFooter>
        </Card>
      </GridItem>
    );
  }
}

ProgramCardItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(programStyle)(ProgramCardItem);
