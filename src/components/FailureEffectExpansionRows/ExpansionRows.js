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

  getRows = data => {
    return data.map(item => {
      return <Row item={item} />;
    });
  };

  render() {
    const { classes, data } = this.props;
    return this.getRows(data);
  }
}

export default withStyles(styles)(ExpansionRows);
