import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
// core components
import tasksStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";

class Tasks extends React.Component {
  toggleEditModal = e => {
    const index = e.currentTarget.getAttribute("data-index");
    const subProject = this.props.subProjects[index];
    this.props.toggleSubProjectModal(e, subProject);
  };
  deleteSubProject = e => {
    const index = e.currentTarget.getAttribute("data-index");
    const subProject = this.props.subProjects[index];
    this.props.deleteSubProject(subProject.id, this.props.item.id);
  };
  fetchProjectDetail = e => {
    const index = e.currentTarget.getAttribute("data-index");
    const subProject = this.props.subProjects[index];
    this.props.fetchProjectDetail(subProject);
  };
  render() {
    const { classes, subProjects, fetchProjectDetail } = this.props;
    return (
      <Table className={classes.table}>
        <TableBody>
          {subProjects.length ? (
            subProjects.map((subProject, index) => (
              <TableRow key={index} className={classes.tableRow}>
                <TableCell className={classes.tableCell}>
                  {`${subProject.id}. ${subProject.name}`}
                </TableCell>
                <TableCell className={classes.tableActions}>
                  <Button
                    variant="extendedFab"
                    aria-label="delete"
                    color="primary"
                    data-index={index}
                    onClick={this.fetchProjectDetail}
                  >
                    Show Detail
                  </Button>
                  <Tooltip
                    id="tooltip-top"
                    title="Edit Task"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <IconButton
                      aria-label="Edit"
                      className={classes.tableActionButton}
                      data-index={index}
                      onClick={this.toggleEditModal}
                    >
                      <Edit
                        className={
                          classes.tableActionButtonIcon + " " + classes.edit
                        }
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top-start"
                    title="Remove"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <IconButton
                      aria-label="Close"
                      data-index={index}
                      onClick={this.deleteSubProject}
                      className={classes.tableActionButton}
                    >
                      <Close
                        className={
                          classes.tableActionButtonIcon + " " + classes.close
                        }
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <h5 style={{ textAlign: "center" }}>No Sub Projects</h5>
          )}
        </TableBody>
      </Table>
    );
  }
}

Tasks.propTypes = {
  classes: PropTypes.object.isRequired,
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.arrayOf(PropTypes.node)
};

export default withStyles(tasksStyle)(Tasks);
