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
import Divider from "@material-ui/core/Divider";
import NavigationIcon from "@material-ui/icons/Navigation";
// child componenets
import ExpansionRows from "components/ProjectExpansionRows/ExpansionRows";
import CreateProjectModal from "components/ProjectModals/CreateProjectModal";
import {
  getProjectsSuccess,
  getProjectsAction,
  getSubProjectsAction,
  createSubProjectAction,
  createProjectAction,
  setAndFetchProjectAction
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
    this.state = { modal: false };
  }

  gotoDetail = project => {
    this.props.setAndFetchProjectAction(project);
    this.props.history.push("/projectDetail");
  };

  toggleCreateModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  componentDidMount() {
    this.props.getProjectsAction();
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Projects</h4>
              <p className={classes.cardCategoryWhite}>
                list of projects and their sub projects
              </p>
            </CardHeader>
            <CardBody>
              <Grid>
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
                    onClick={this.toggleCreateModal}
                  >
                    <AddIcon className={classes.extendedIcon} />
                    Create
                  </Button>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Table
                    tableHeaderColor="info"
                    customRows={
                      <ExpansionRows
                        data={this.props.projects}
                        getSubProjects={this.props.getSubProjectsAction}
                        createSubProject={this.props.createSubProjectAction}
                        openProject={this.gotoDetail}
                      />
                    }
                  />
                </GridItem>
              </Grid>
            </CardBody>
          </Card>
        </GridItem>
        <CreateProjectModal
          title={"Create Project"}
          open={this.state.modal}
          handleClose={this.toggleCreateModal}
          onSubmit={this.props.createProjectAction}
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
    getSubProjectsAction,
    createProjectAction,
    createSubProjectAction,
    getProjectsSuccess,
    setAndFetchProjectAction
  }
)(withStyles(styles)(Projects));
