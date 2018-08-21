import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Grid from "@material-ui/core/Grid";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import FunctionElement from "./FunctionElement.jsx";
import InputElement from "./InputElement.jsx";
import OutputElement from "./OutputElement.jsx";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    background: "transparent"
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
    zIndex: 1000,
    color: "white",
    fontWeight: 500
  },
  expansionDetailRoot: {
    padding: 0
  }
});

class ItemElement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.open && nextProps.index !== nextProps.openIndex) {
      this.setState({
        open: false
      });
    }
  }

  toggleRow = () => {
    this.checkSubFunctions(!this.state.open);
  };

  checkSubFunctions = rowState => {
    const state = { open: rowState };
    const { item } = this.props;
    if (rowState && !item.subProFetched) {
      this.props.updateIndex(this.props.index);
      this.props.getFunctionsAction(item.id);
    }
    this.setState(state);
  };

  delete = e => {
    e.stopPropagation();
    this.props.deleteItem(this.props.item.id);
  };

  toggleItemModal = e => {
    e.stopPropagation();
    this.props.toggleItemModal(null, "update", this.props.item);
  };

  render() {
    const { classes, item, openIndex } = this.props;
    const { open } = this.state;
    return (
      <GridItem xs={12} sm={12} md={12}>
        <ExpansionPanel expanded={open} onChange={this.toggleRow}>
          <ExpansionPanelSummary
            classes={{
              content: classes.expansionContent,
              expandIcon: classes.expansionExpandIcon
            }}
            style={{ padding: 0, margin: 0 }}
            IconButtonProps={{ style: { zIndex: 1000 } }}
            expandIcon={<ExpandMoreIcon />}
          >
            <CardHeader style={{ width: "100%", margin: 6 }} color="info">
              <Grid container>
                <GridItem xs={10} lg={10} md={10} style={{ paddingLeft: 0 }}>
                  <h4 className={classes.cardTitleWhite}>Item: {item.name}</h4>
                  <p className={classes.cardCategoryWhite}>
                    Expand to create and view info
                  </p>
                </GridItem>
                <GridItem xs={2} lg={2} md={2}>
                  <Button
                    variant="fab"
                    mini
                    color="primary"
                    aria-label="Update"
                    className={classes.button}
                    onClick={this.toggleItemModal}
                  >
                    <Icon>edit_icon</Icon>
                  </Button>
                  <Button
                    variant="fab"
                    mini
                    color="secondary"
                    aria-label="Update"
                    className={classes.button}
                    onClick={this.delete}
                  >
                    <Icon>highlight_off</Icon>
                  </Button>
                </GridItem>
              </Grid>
            </CardHeader>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            classes={{
              root: classes.expansionDetailRoot
            }}
          >
            <CardBody style={{ padding: 0 }}>
              {/* <Tasks
                item={item}
                fetchProjectDetail={this.props.fetchProjectDetail}
                subProjects={item.subProjects}
                toggleSubProjectModal={this.toggleSubProjectModal}
                deleteSubProject={deleteSubProject}
              /> */}
              <Grid container>
                <FunctionElement openIndex={openIndex} item={this.props.item} />
                <InputElement openIndex={openIndex} item={this.props.item} />
                <OutputElement openIndex={openIndex} item={this.props.item} />
              </Grid>
            </CardBody>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </GridItem>
    );
  }
}

ItemElement.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemElement);