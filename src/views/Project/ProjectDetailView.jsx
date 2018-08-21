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
import ItemElement from "components/ProjectDetailComponents/ItemElement.jsx";
import CreateItemModal from "components/ProjectDetailComponents/modals/CreateItemModal.jsx";
//helper
import { capitalizeFirstLetter } from "utils/helpers";

//actions
import {
  getItemsAction,
  createItemAction,
  updateItemAction,
  deleteItemAction
} from "actions/ItemActions";

import { getFunctionsAction } from "actions/FunctionActions";
import { clearItem } from "actions/SharedActions";

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

class Items extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      itemModal: false,
      modalMode: "create",
      openIndex: null,
      modelTitle: "Item",
      selectedItem: {}
    };
  }

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = () => {
    this.props.getItemsAction(this.props.selectedProject.id);
  };

  deleteItem = id => {
    this.props.deleteItemAction(id);
  };

  toggleItemModal = (e, mode = "create", item = {}) => {
    this.setState({
      itemModal: !this.state.itemModal,
      modalMode: mode,
      selectedItem: item
    });
  };

  getItemElements = items => {
    if (items.length) {
      return items.map((item, index) => {
        return (
          <ItemElement
            item={item}
            index={index}
            openIndex={this.state.openIndex}
            updateIndex={passedIndex => {
              this.props.clearItem();
              this.setState({ openIndex: passedIndex });
            }}
            getFunctionsAction={this.props.getFunctionsAction}
            deleteItem={this.deleteItem}
            toggleItemModal={this.toggleItemModal}
          />
        );
      });
    }
    return <h1 style={{ textAlign: "center" }}> No Items </h1>;
  };

  populateItemAction = () => {
    if (this.state.modalMode === "create") {
      return this.props.createItemAction;
    }
    return this.props.updateItemAction;
  };

  getTitle = () => {
    return `${capitalizeFirstLetter(
      this.state.modalMode
    )} ${capitalizeFirstLetter(this.state.modelTitle)}`;
  };

  render() {
    const { classes, items } = this.props;
    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12} style={{ textAlign: "right" }}>
          <Button
            variant="extendedFab"
            aria-label="delete"
            color="primary"
            className={classes.button}
            onClick={this.fetchItems}
          >
            Refresh
          </Button>
          <Button
            variant="extendedFab"
            aria-label="delete"
            color="primary"
            className={classes.button}
            onClick={this.toggleItemModal}
          >
            <AddIcon className={classes.extendedIcon} />
            Create Item
          </Button>
        </GridItem>
        {this.getItemElements(items)}
        <CreateItemModal
          title={this.getTitle()}
          open={this.state.itemModal}
          modalMode={this.state.modalMode}
          selectedProject={this.props.selectedProject}
          selectedItem={this.state.selectedItem}
          handleClose={this.toggleItemModal}
          onSubmit={this.populateItemAction()}
        />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  items: state.projectDetailReducer.items,
  selectedProject: state.projectReducer.selectedProject
});

export default connect(
  mapStateToProps,
  {
    getItemsAction,
    createItemAction,
    updateItemAction,
    deleteItemAction,
    getFunctionsAction,
    clearItem
  }
)(withRouter(withStyles(styles)(Items)));
