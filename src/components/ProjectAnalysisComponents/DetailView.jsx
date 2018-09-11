import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Grid from "@material-ui/core/Grid";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import DetailViewTable from "./DetailViewTable.jsx";

import {
  getInputsAction,
  createInputAction,
  updateInputAction,
  deleteInputAction
} from "actions/InputActions";

const styles = theme => ({
  grid: {
    padding: "0px !important"
  },
  button: {
    margin: theme.spacing.unit,
    background: "transparent"
  },
  formControl: {
    width: "100%"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  cardCategoryWhite: {
    textAlign: "left",
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
    textAlign: "left",
    color: "black",
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
  grid: {
    padding: "0px !important"
  },
  expansionContent: {
    margin: "0px 0px !important"
  },
  expansionExpandIcon: {
    zIndex: 1000,
    color: "white",
    fontWeight: 500
  },
  expansionDetailRoot: {
    padding: 0
  },
  container: {
    height: "100%"
  }
});

class DetailView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  componentWillReceiveProps(nextProps) {}

  getPreParedData = node => {
    let data = [];
    Object.keys(node).forEach(nodeKey => {
      if (node[nodeKey] && !Array.isArray(node[nodeKey])) {
        data.push({
          label: nodeKey,
          value: node[nodeKey]
        });
      }
    });
    return data;
  };

  render() {
    const { classes, selectedNode, selectedNodeType, item } = this.props;
    const { open } = this.state;
    const height = item.h * 80 + (item.h - 1) * 20;
    return (
      <div style={{ height: "100%" }}>
        <Grid container classes={{ container: classes.container }}>
          <GridItem xs={12} sm={12} md={12} classes={{ grid: classes.grid }}>
            <Card
              style={{
                height: selectedNode && selectedNode.id ? "95%" : "85%"
              }}
              classes={{ root: classes.container }}
            >
              <CardHeader
                color="primary"
                style={{
                  background: "whitesmoke",
                  boxShadow: "0 1px 5px 0 rgba(0, 0, 0,0.3)"
                }}
              >
                <h4 className={classes.cardTitleWhite}>Detail View</h4>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ padding: "0px !important" }}
                  >
                    <div>
                      {selectedNode && selectedNode.id ? (
                        <React.Fragment>
                          <p>NodeType: {selectedNodeType}</p>
                          <DetailViewTable
                            height={height}
                            data={this.getPreParedData(selectedNode)}
                          />
                        </React.Fragment>
                      ) : (
                        <h6>Select Any Node to View Detail Data</h6>
                      )}
                    </div>
                  </GridItem>
                </Grid>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

DetailView.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  selectedNodeType: state.projectAnalysisReducer.selectedNodeType,
  selectedNode: state.projectAnalysisReducer.selectedNode
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(DetailView));
