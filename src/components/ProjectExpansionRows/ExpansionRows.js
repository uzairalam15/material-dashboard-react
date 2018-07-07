import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// child components
import Row from "./Row";
import CreateSubProjectModal from "components/ProjectModals/CreateSubProjectModal";

const styles = theme => ({});

class ExpansionRows extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selectedProjectId: null
    };
  }

  toggleSubProjectModal = id => {
    this.setState({
      modal: !this.state.modal,
      selectedProjectId: id
    });
  };

  onSubmit = data => {
    this.props.createSubProject(
      Object.assign({}, data, {
        ProjectRID: `${this.state.selectedProjectId}`
      })
    );
    this.toggleSubProjectModal();
  };

  getRows = data => {
    return data.map(item => {
      return (
        <Row
          item={item}
          openProject={this.props.openProject}
          getSubProjects={this.props.getSubProjects}
          toggleModal={this.toggleSubProjectModal}
        />
      );
    });
  };

  render() {
    const { classes, data } = this.props;
    return (
      <div>
        {this.getRows(data)}
        <CreateSubProjectModal
          title={"Create Sub Project"}
          open={this.state.modal}
          handleClose={this.toggleSubProjectModal}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ExpansionRows);
