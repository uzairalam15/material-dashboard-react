import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// child components
import Row from "./Row";
import CreateSubFunctionModal from "components/ProjectModals/CreateSubFunctionModal";
import FunctionDetailModal from "components/ProjectModals/FunctionDetailModal";

const styles = theme => ({});

class ExpansionRows extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      detailModal: false,
      selectedFunctionId: null,
      selectedFunction: null
    };
  }

  toggleSubFunctionModal = id => {
    this.setState({
      modal: !this.state.modal,
      selectedFunctionId: id
    });
  };
  toggledetailModal = item => {
    this.setState({
      detailModal: !this.state.detailModal,
      selectedFunction: item
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
          openDetailModal={this.toggledetailModal}
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
        <FunctionDetailModal
          title={"Function Detail"}
          item={this.state.selectedFunction}
          open={this.state.detailModal}
          handleClose={this.toggledetailModal}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ExpansionRows);
