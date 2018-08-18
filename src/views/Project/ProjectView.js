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
import ProjectCardItem from "components/ProjectComponents/ProjectCardItem";
import CreateProjectModal from "components/ProjectComponents/CreateProjectModal";
//helper
import { capitalizeFirstLetter } from "utils/helpers";

//actions
import {
  getProjectsAction,
  createProjectAction,
  updateProjectAction,
  deleteProjectAction
} from "actions/ProjectActions";

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

class Projects extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { modal: false, modalMode: "create", selectedProject: {} };
  }

  fetchSubProjects = id => {
    this.props.getProjectsAction(id);
  };

  deleteProject = id => {
    this.props.deleteProjectAction(id);
  };

  toggleModal = (e, mode = "create", project = {}) => {
    this.setState({
      modal: !this.state.modal,
      modalMode: mode,
      selectedProject: project
    });
  };

  getProjectCards = items => {
    if (items.length) {
      return items.map(item => {
        return (
          <ProjectCardItem
            item={item}
            fetchProjects={this.fetchProjects}
            deleteProject={this.deleteProject}
            toggleModal={this.toggleModal}
          />
        );
      });
    }
    return <h1 style={{ textAlign: "center" }}> No Projects </h1>;
  };

  populateAction = () => {
    if (this.state.modalMode === "create") {
      return this.props.createProjectAction;
    }
    return this.props.updateProjectAction;
  };

  getTitle = () => {
    return `${capitalizeFirstLetter(this.state.modalMode)} Project`;
  };

  render() {
    const { classes, projects } = this.props;
    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Projects</h4>
              <p className={classes.cardCategoryWhite}>list of projects</p>
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
                    onClick={this.props.getProjectsAction}
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
                {/* {this.getProjectCards(projects)} */}
              </Grid>
            </CardBody>
          </Card>
        </GridItem>
        <CreateProjectModal
          title={this.getTitle()}
          open={this.state.modal}
          modalMode={this.state.modalMode}
          selectedProject={this.state.selectedProject}
          handleClose={this.toggleModal}
          onSubmit={this.populateAction()}
        />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projectReducer.projects
});

export default connect(
  mapStateToProps,
  {
    getProjectsAction,
    createProjectAction,
    updateProjectAction,
    deleteProjectAction
  }
)(withStyles(styles)(Projects));
