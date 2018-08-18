import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
// child componenets
import ProgramCardItem from "components/ProgramComponents/ProgramCardItem";
import CreateProgramModal from "components/ProgramComponents/CreateProgramModal";
//helper
import { capitalizeFirstLetter } from "utils/helpers";

//actions
import {
  getProgramsAction,
  createProgramAction,
  updateProgramAction,
  deleteProgramAction
} from "actions/ProgramActions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
});

class Programs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { modal: false, modalMode: "create", selectedProgram: {} };
  }

  fetchProjects = id => {
    this.props.getProjectsAction(id);
  };

  deleteProgram = id => {
    this.props.deleteProgramAction(id);
  };

  toggleModal = (e, mode = "create", program = {}) => {
    this.setState({
      modal: !this.state.modal,
      modalMode: mode,
      selectedProgram: program
    });
  };

  getProgramCards = items => {
    if (items.length) {
      return items.map(item => {
        return (
          <ProgramCardItem
            item={item}
            fetchProjects={this.fetchProjects}
            deleteProgram={this.deleteProgram}
            toggleModal={this.toggleModal}
          />
        );
      });
    }
    return <h1 style={{ textAlign: "center" }}> No Programs </h1>;
  };

  populateAction = () => {
    if (this.state.modalMode === "create") {
      return this.props.createProgramAction;
    }
    return this.props.updateProgramAction;
  };

  getTitle = () => {
    return `${capitalizeFirstLetter(this.state.modalMode)} Program`;
  };

  render() {
    const { classes, programs } = this.props;
    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Programs</h4>
              <p className={classes.cardCategoryWhite}>list of programs</p>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ textAlign: "right" }}
                >
                  <Button
                    variant="extendedFab"
                    aria-label="delete"
                    color="primary"
                    className={classes.button}
                    onClick={this.props.getProgramsAction}
                  >
                    Refresh
                  </Button>
                  <Button
                    variant="extendedFab"
                    aria-label="delete"
                    color="primary"
                    className={classes.button}
                    onClick={this.toggleModal}
                  >
                    <AddIcon className={classes.extendedIcon} />
                    Create
                  </Button>
                </GridItem>
                {this.getProgramCards(programs)}
              </Grid>
            </CardBody>
          </Card>
        </GridItem>
        <CreateProgramModal
          title={this.getTitle()}
          open={this.state.modal}
          modalMode={this.state.modalMode}
          selectedProgram={this.state.selectedProgram}
          handleClose={this.toggleModal}
          onSubmit={this.populateAction()}
        />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  programs: state.programReducer.programs
});

export default connect(
  mapStateToProps,
  {
    getProgramsAction,
    createProgramAction,
    updateProgramAction,
    deleteProgramAction
  }
)(withStyles(styles)(Programs));
