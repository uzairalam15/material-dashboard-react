import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Select from "react-select";

import Grid from "@material-ui/core/Grid";
// import Select from "@material-ui/core/Select";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import { setSelectedNode, fetchAndPrepareData } from "actions/ItemActions";
import { getObjectOfId } from "utils/helpers";

const styles = theme => ({
  grid: {
    padding: "0px !important"
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  cardTitleWhite: {
    color: "black",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
});

class ItemSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.selectedOption &&
      this.state.selectedOption.id !== nextProps.selectedNode.id
    ) {
      this.setState({
        selectedOption: null
      });
    }
  }

  getFunctionItems = functions => {
    return functions.map(functionItem => {
      return { value: functionItem.id, label: functionItem.name };
    });
  };

  handleChange = selectedOption => {
    this.props.setSelectedNode({
      type: "Function",
      node: getObjectOfId(this.props.functions, selectedOption.value)
    });
    this.props.fetchAndPrepareData(selectedOption.value);
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    const { item, classes, functions } = this.props;
    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12} classes={{ grid: classes.grid }}>
          <Card>
            <CardHeader
              color="primary"
              style={{
                background: "whitesmoke",
                boxShadow: "0 1px 5px 0 rgba(0, 0, 0,0.3)"
              }}
            >
              <h4 className={classes.cardTitleWhite}>Search/Select Function</h4>
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
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      isSearchable={true}
                      name="color"
                      onChange={this.handleChange}
                      value={this.state.selectedOption}
                      options={this.getFunctionItems(functions)}
                    />
                  </div>
                </GridItem>
              </Grid>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  functions: state.projectDetailReducer.functions,
  selectedNode: state.projectAnalysisReducer.selectedNode
});

export default connect(
  mapStateToProps,
  {
    setSelectedNode,
    fetchAndPrepareData
  }
)(withStyles(styles)(ItemSelect));
