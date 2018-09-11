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
import GridViewLayout from "components/ProjectAnalysisComponents/GridViewLayout";
//helper
import { capitalizeFirstLetter } from "utils/helpers";

//actions
import {
  getItemsAction,
  createItemAction,
  updateItemAction,
  deleteItemAction
} from "actions/ItemActions";

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
    this.fetchItems();
  }

  fetchItems = () => {
    this.props.getItemsAction(this.props.selectedProject.id);
  };

  // componentDidMount() {
  //   this.props.clearProject();
  //   this.fetchProjects();
  // }

  // fetchProjectDetail = item => {
  //   this.props.setSelectedProject(item);
  //   this.props.history.push("/projectDetails");
  // };

  // fetchProjects = () => {
  //   this.props.getProjectsAction(this.props.selectedProgram);
  // };

  // fetchSubProjects = id => {
  //   this.props.getSubProjectsAction(id);
  // };

  // deleteProject = id => {
  //   this.props.deleteProjectAction(id);
  // };

  // deleteSubProject = (id, projectId) => {
  //   this.props.deleteSubProjectAction(id, projectId);
  // };

  // updateProject = (data, id) => {
  //   this.props.updateProjectAction(data, id);
  // };

  // updateSubProject = (data, id, projectId) => {
  //   this.props.updateSubProjectAction(data, id, projectId);
  // };

  // toggleProjectModal = (e, mode = "create", project = {}) => {
  //   this.setState({
  //     projectModal: !this.state.projectModal,
  //     modalMode: mode,
  //     modelTitle: "Project",
  //     selectedProject: project
  //   });
  // };

  // toggleSubProjectModal = (
  //   e,
  //   mode = "create",
  //   project = {},
  //   subProject = {}
  // ) => {
  //   this.setState({
  //     subProjectModal: !this.state.subProjectModal,
  //     modalMode: mode,
  //     modelTitle: "Sub Project",
  //     selectedProject: project,
  //     selectedSubProject: subProject
  //   });
  // };

  // getProjectCards = items => {
  //   if (items.length) {
  //     return items.map(item => {
  //       return (
  //         <ProjectElement
  //           item={item}
  //           fetchSubProjects={this.fetchSubProjects}
  //           deleteSubProject={this.deleteSubProject}
  //           fetchProjectDetail={this.fetchProjectDetail}
  //           deleteProject={this.deleteProject}
  //           toggleProjectModal={this.toggleProjectModal}
  //           toggleSubProjectModal={this.toggleSubProjectModal}
  //         />
  //       );
  //     });
  //   }
  //   return <h1 style={{ textAlign: "center" }}> No Projects </h1>;
  // };

  // populateProjectAction = () => {
  //   if (this.state.modalMode === "create") {
  //     return this.props.createProjectAction;
  //   }
  //   return this.props.updateProjectAction;
  // };

  // populateSubProjectAction = () => {
  //   if (this.state.modalMode === "create") {
  //     return this.props.createSubProjectAction;
  //   }
  //   return this.props.updateSubProjectAction;
  // };

  // getTitle = () => {
  //   return `${capitalizeFirstLetter(
  //     this.state.modalMode
  //   )} ${capitalizeFirstLetter(this.state.modelTitle)}`;
  // };

  render() {
    const {
      classes,
      projects,
      items,
      selectedProject,
      selectedItem,
      selectedNodeType
    } = this.props;
    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <GridViewLayout
            items={items}
            selectedProject={selectedProject}
            selectedItem={selectedItem}
            selectedNodeType={selectedNodeType}
            selectedProject={selectedProject}
          />
        </GridItem>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  selectedItem: state.projectAnalysisReducer.selectedItem,
  selectedNodeType: state.projectAnalysisReducer.selectedNodeType,
  items: state.projectDetailReducer.items,
  selectedProject: state.projectReducer.selectedProject
});

export default connect(
  mapStateToProps,
  {
    getItemsAction
  }
)(withRouter(withStyles(styles)(Projects)));
