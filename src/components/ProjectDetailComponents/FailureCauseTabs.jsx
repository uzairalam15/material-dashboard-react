import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";

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
import GridItem from "components/Grid/GridItem.jsx";
import NoiseFactorElement from "./NoiseFactorElement.jsx";
import PreventionControlElement from "./PreventionControlElement.jsx";
import SafetyRequirementElement from "./SafetyRequirementElement.jsx";

class Tasks extends React.Component {
  toggleEditModal = e => {
    const index = e.currentTarget.getAttribute("data-index");
    const failureCauseItem = this.props.items[index];
    this.props.toggleEditModal(e, "update", failureCauseItem);
  };

  deleteFailureCause = e => {
    const index = e.currentTarget.getAttribute("data-index");
    const failureCauseItem = this.props.items[index];
    this.props.deleteFailureCause(failureCauseItem.id);
  };

  render() {
    const { classes } = this.props;
    return (
      <GridItem xs={12} lg={12} md={12}>
        <CustomTabs
          title="Dependents:"
          headerColor="primary"
          tabs={[
            {
              tabName: "Noise Factor",
              tabContent: (
                <NoiseFactorElement
                  item={this.props.item}
                  openIndex={this.props.openIndex}
                />
              )
            },
            {
              tabName: "Prevention Control",
              tabContent: (
                <PreventionControlElement
                  item={this.props.item}
                  openIndex={this.props.openIndex}
                />
              )
            },
            {
              tabName: "Safety Requirements",
              tabContent: (
                <SafetyRequirementElement
                  item={this.props.item}
                  openIndex={this.props.openIndex}
                />
              )
            }
          ]}
        />
      </GridItem>
    );
  }
}

Tasks.propTypes = {
  classes: PropTypes.object.isRequired,
  failureCauses: PropTypes.arrayOf(PropTypes.node)
};

export default withStyles(tasksStyle)(Tasks);
