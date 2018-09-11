import React from "react";
import { connect } from "react-redux";
import ReactEcharts from "echarts-for-react";
import { withStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { setSelectedNode, fetchAndPrepareData } from "actions/ItemActions";
import { getObjectOfId } from "utils/helpers";
import { ReactSVGPanZoom } from "react-svg-pan-zoom";
import { AutoSizer } from "react-virtualized";

const styles = theme => ({
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
  }
});

class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "radial"
    };

    this.echarts_react = null;
  }

  prepareFunctions = (functions = []) => {
    return functions.map(functionItem => {
      return {
        name: `${functionItem.id}`,
        value: `${functionItem.name}`,
        itemStyle: this.checkSelectedNode(functionItem, this.props.selectedNode)
      };
    });
  };

  checkSelectedNode = (item, selectedNode) => {
    if (selectedNode && item.id === selectedNode.id) {
      return {
        borderColor: "#000",
        borderWidth: 6.5
      };
    }
    return {};
  };

  getData = props => {
    const { selectedItem, functions, selectedNode } = props;
    let data = null;
    if (selectedItem && selectedItem.id && functions.length) {
      data = [
        {
          name: `${selectedItem.id}-Item`,
          children: this.prepareFunctions(functions),
          itemStyle: this.checkSelectedNode(selectedItem, selectedNode)
        }
      ];
    }
    return data;
  };

  getRadialOptions = (state, props) => {
    const data = this.getData(props) || [];
    console.log("tree", data);
    return {
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove"
      },
      series: {
        type: "tree",
        name: "function",
        data: data,
        layout: state.type,

        top: "18%",
        bottom: "14%",
        left: "14%",
        roam: true,
        lineStyle: {
          width: 4.5
        },
        symbolSize: 25,
        expandAndCollapse: true,
        initialTreeDepth: 1,

        animationDuration: 550,
        animationDurationUpdate: 750
      }
    };
  };

  getOption = state => {
    return {
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove"
      },
      legend: {
        top: "2%",
        left: "3%",
        orient: "vertical",
        data: [
          {
            name: "function",
            icon: "rectangle"
          }
        ],
        borderColor: "#c23531"
      },
      series: {
        type: "tree",
        name: "function",
        data: [this.data],
        layout: state.type,

        top: "5%",
        left: "7%",
        bottom: "2%",
        right: "10%",
        roam: true,

        label: {
          normal: {
            position: "left",
            verticalAlign: "middle",
            align: "right"
          }
        },
        leaves: {
          label: {
            normal: {
              position: "right",
              verticalAlign: "middle",
              align: "left"
            }
          }
        },

        symbolSize: 7,
        expandAndCollapse: true,

        animationDuration: 550,
        animationDurationUpdate: 750
      }
    };
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChartClick = params => {
    const data = params.value
      ? {
          type: "Function",
          node: getObjectOfId(this.props.functions, params.name)
        }
      : {
          type: "Item",
          node: this.props.selectedItem
        };
    this.props.setSelectedNode(data);
    if (params.value) {
      this.props.fetchAndPrepareData(params.name);
    }
  };

  render() {
    let onEvents = {
      click: this.onChartClick
    };

    const { classes, item, selectedItem } = this.props;
    return (
      <div>
        <Card style={{ boxShadow: "none" }}>
          <CardHeader
            color="primary"
            style={{
              background: "whitesmoke",
              boxShadow: "0 1px 5px 0 rgba(0, 0, 0,0.3)"
            }}
          >
            <h4 className={classes.cardTitleWhite}>Functional Radial View</h4>
          </CardHeader>
        </Card>
        {selectedItem && selectedItem.id ? (
          <ReactEcharts
            ref={e => {
              this.echarts_react = e;
            }}
            option={this.getRadialOptions(this.state, this.props)}
            style={{ height: item.h * 90, width: "100%" }}
            onEvents={onEvents}
          />
        ) : (
          <h6>Select Item To Load Functional Graph</h6>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  functions: state.projectDetailReducer.functions,
  selectedItem: state.projectAnalysisReducer.selectedItem,
  selectedNode: state.projectAnalysisReducer.selectedNode
});

export default connect(
  mapStateToProps,
  { setSelectedNode, fetchAndPrepareData }
)(withStyles(styles)(Tree));
