import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// child components
import Row from "./Row";
import CreateSubFunctionModal from "components/ProjectModals/CreateSubFunctionModal";

const styles = theme => ({});

class ExpansionRows extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selectedFunctionId: null
    };
  }

  toggleSubFunctionModal = id => {
    this.setState({
      modal: !this.state.modal,
      selectedFunctionId: id
    });
  };

  onSubmit = data => {
    this.props.createSubFunction(
      Object.assign({}, data, {
        FunctionRID: `${this.state.selectedFunctionId}`
      })
    );
    this.toggleSubFunctionModal();
  };

  getRows = data => {
    return data.map(item => {
      return (
        <Row
          item={item}
          getSubFunctions={this.props.getSubFunctions}
          toggleModal={this.toggleSubFunctionModal}
        />
      );
    });
  };

  render() {
    const { classes, data } = this.props;
    return (
      <div>
        {this.getRows(data)}
        <CreateSubFunctionModal
          title={"Create Sub Function"}
          open={this.state.modal}
          handleClose={this.toggleSubFunctionModal}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ExpansionRows);
