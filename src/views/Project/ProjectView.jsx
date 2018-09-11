import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
// child componenets
import ProjectElement from "components/ProjectComponents/ProjectElement";
import CreateProjectModal from "components/ProjectComponents/CreateProjectModal";
import CreateSubProjectModal from "components/ProjectComponents/CreateSubProjectModal";
//helper
import { capitalizeFirstLetter } from "utils/helpers";

//actions
import {
  getProjectsAction,
  createProjectAction,
  updateProjectAction,
  deleteProjectAction,
  getSubProjectsAction,
  createSubProjectAction,
  updateSubProjectAction,
  deleteSubProjectAction,
  setSelectedProject
} from "actions/ProjectActions";

import { clearProject } from "actions/SharedActions";

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
  },
  expansionContent: {
    margin: "0px 0px"
  },
  expansionExpandIcon: {
    zIndex: 1000
  },
  expansionDetailRoot: {
    padding: 0
  }
});

class Projects extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      projectModal: false,
      subProjectModal: false,
      modalMode: "create",
      modelTitle: "Project",
      selectedProject: {},
      selectedSubProject: {}
    };
  }

  componentDidMount() {
    this.props.clearProject();
    this.fetchProjects();
  }

  fetchProjectDetail = (item, analysis) => {
    this.props.setSelectedProject(item);
    if (analysis) {
      this.props.history.push("/projectAnalysis");
    } else {
      this.props.history.push("/projectDetails");
    }
  };

  fetchProjects = () => {
    this.props.getProjectsAction(this.props.selectedProgram);
  };

  fetchSubProjects = id => {
    this.props.getSubProjectsAction(id);
  };

  deleteProject = id => {
    this.props.deleteProjectAction(id);
  };

  deleteSubProject = (id, projectId) => {
    this.props.deleteSubProjectAction(id, projectId);
  };

  updateProject = (data, id) => {
    this.props.updateProjectAction(data, id);
  };

  updateSubProject = (data, id, projectId) => {
    this.props.updateSubProjectAction(data, id, projectId);
  };

  toggleProjectModal = (e, mode = "create", project = {}) => {
    this.setState({
      projectModal: !this.state.projectModal,
      modalMode: mode,
      modelTitle: "Project",
      selectedProject: project
    });
  };

  toggleSubProjectModal = (
    e,
    mode = "create",
    project = {},
    subProject = {}
  ) => {
    this.setState({
      subProjectModal: !this.state.subProjectModal,
      modalMode: mode,
      modelTitle: "Sub Project",
      selectedProject: project,
      selectedSubProject: subProject
    });
  };

  getProjectCards = items => {
    if (items.length) {
      return items.map(item => {
        return (
          <ProjectElement
            item={item}
            fetchSubProjects={this.fetchSubProjects}
            deleteSubProject={this.deleteSubProject}
            fetchProjectDetail={this.fetchProjectDetail}
            deleteProject={this.deleteProject}
            toggleProjectModal={this.toggleProjectModal}
            toggleSubProjectModal={this.toggleSubProjectModal}
          />
        );
      });
    }
    return <h1 style={{ textAlign: "center" }}> No Projects </h1>;
  };

  populateProjectAction = () => {
    if (this.state.modalMode === "create") {
      return this.props.createProjectAction;
    }
    return this.props.updateProjectAction;
  };

  populateSubProjectAction = () => {
    if (this.state.modalMode === "create") {
      return this.props.createSubProjectAction;
    }
    return this.props.updateSubProjectAction;
  };

  getTitle = () => {
    return `${capitalizeFirstLetter(
      this.state.modalMode
    )} ${capitalizeFirstLetter(this.state.modelTitle)}`;
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
                    onClick={this.fetchProjects}
                  >
                    Refresh
                  </Button>
                  <Button
                    variant="extendedFab"
                    aria-label="delete"
                    color="primary"
                    className={classes.button}
                    onClick={this.toggleProjectModal}
                  >
                    <AddIcon className={classes.extendedIcon} />
                    Create
                  </Button>
                </GridItem>
                {this.getProjectCards(projects)}
              </Grid>
            </CardBody>
          </Card>
        </GridItem>
        <CreateProjectModal
          title={this.getTitle()}
          open={this.state.projectModal}
          modalMode={this.state.modalMode}
          selectedProgram={this.props.selectedProgram}
          selectedProject={this.state.selectedProject}
          handleClose={this.toggleProjectModal}
          onSubmit={this.populateProjectAction()}
        />
        <CreateSubProjectModal
          title={this.getTitle()}
          open={this.state.subProjectModal}
          modalMode={this.state.modalMode}
          selectedProject={this.state.selectedProject}
          selectedSubProject={this.state.selectedSubProject}
          handleClose={this.toggleSubProjectModal}
          onSubmit={this.populateSubProjectAction()}
        />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projectReducer.projects,
  selectedProgram: state.programReducer.selectedProgram
});

export default connect(
  mapStateToProps,
  {
    getProjectsAction,
    createProjectAction,
    updateProjectAction,
    deleteProjectAction,
    getSubProjectsAction,
    createSubProjectAction,
    updateSubProjectAction,
    deleteSubProjectAction,
    setSelectedProject,
    clearProject
  }
)(withRouter(withStyles(styles)(Projects)));
