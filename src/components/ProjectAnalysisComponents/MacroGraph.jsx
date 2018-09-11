import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
import { vertex, relations, graphFlow } from "variables/graphs";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { preparedGraphData } from "utils/helpers";
import { setSelectedNode } from "actions/ItemActions";

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

class FullGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reRender: 1,
      type: "force",
      curveness: 0,
      subModal: false,
      selectedNode: ""
    };
    this.graphData = { nodes: [], links: [] };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.functionData !== nextProps.functionData &&
      nextProps.selectedNode
    ) {
      this.graphData = preparedGraphData(
        nextProps.functionData,
        nextProps.selectedNode
      );
    }
  }

  closeModal = () => {
    this.setState({
      subModal: false
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  reRender = () => {
    this.setState({
      reRender: !this.state.reRender
    });
  };

  getCategories = vertex => {
    return Object.keys(vertex).map(key => {
      return {
        name: vertex[key]
      };
    });
  };

  getOption = state => {
    return {
      backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
        {
          offset: 0,
          color: "#f7f8fa"
        },
        {
          offset: 1,
          color: "#cdd0d5"
        }
      ]),
      title: {
        text: "",
        top: "top",
        left: "center"
      },
      tooltip: {},
      legend: [
        {
          formatter: function(name) {
            return echarts.format.truncateText(
              name,
              150,
              "14px Microsoft Yahei",
              "…"
            );
          },
          tooltip: {
            show: true
          },
          selectedMode: "false",
          bottom: 20,
          data: Object.values(vertex)
        }
      ],
      animationDuration: 500,
      animationEasingUpdate: "linear",
      series: [
        {
          name: "graph flow",
          type: "graph",
          layout: state.type,

          force: {
            repulsion: 2000,
            layoutAnimation: true
          },
          edgeSymbol: ["none", "arrow"],
          edgeSymbolSize: 8,
          edgeLabel: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 10
              },
              formatter: "{c}"
            }
          },
          data: this.graphData.nodes,
          links: this.graphData.links,
          categories: this.getCategories(vertex),
          focusNodeAdjacency: true,
          roam: true,
          label: {
            normal: {
              show: true,
              position: "top"
            },
            formatter: "{c}"
          },
          lineStyle: {
            normal: {
              color: "source",
              curveness: state.curveness,
              type: "solid"
            }
          },
          emphasis: {
            lineStyle: {
              width: 5
            }
          }
        }
      ]
    };
  };

  onChartClick = params => {
    console.log(params);
    if (params.dataType === "node") {
      this.props.setSelectedNode({
        node: params.data.node,
        type: params.data.category
      });
    }
  };

  render() {
    let onEvents = {
      click: this.onChartClick
    };
    console.log("graph data", this.graphData);
    const { classes } = this.props;
    return (
      <div style={{ height: "100%" }}>
        <Grid container style={{ height: "100%" }}>
          <GridItem
            xs={12}
            sm={12}
            md={12}
            classes={{ grid: { padding: "0px" } }}
          >
            <Card style={{ height: "92%" }}>
              <CardHeader
                color="primary"
                style={{
                  background: "whitesmoke",
                  boxShadow: "0 1px 5px 0 rgba(0, 0, 0,0.3)"
                }}
              >
                <h4 className={classes.cardTitleWhite}>
                  Detail FMEA Info Graph
                </h4>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ padding: "0px !important" }}
                  >
                    {this.props.selectedNode ? (
                      <div>
                        <Grid container>
                          <GridItem xs={12} sm={12} md={6} />
                          <GridItem xs={12} sm={12} md={6}>
                            <form className={classes.root} autoComplete="off">
                              {/* <FormControl className={classes.formControl}>
                              <InputLabel htmlFor="type">
                                Edge Curveness
                              </InputLabel>
                              <Input
                                value={this.state.curveness}
                                name="curveness"
                                onChange={this.handleChange}
                              />
                            </FormControl> */}
                              <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="type">Type</InputLabel>
                                <Select
                                  name="type"
                                  value={this.state.type}
                                  onChange={this.handleChange}
                                >
                                  <MenuItem value={"force"}>Normal</MenuItem>
                                  <MenuItem value={"circular"}>
                                    Circular
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </form>
                          </GridItem>
                        </Grid>
                        <ReactEcharts
                          option={this.getOption(this.state)}
                          showLoading={this.props.loader}
                          style={{
                            height: this.props.item.h * 110,
                            paddingTop: 0
                          }}
                          onEvents={onEvents}
                        />
                      </div>
                    ) : (
                      <h6>
                        Please Select Function To View Detail Graphical View
                      </h6>
                    )}
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

const mapStateToProps = state => ({
  functionData: state.projectAnalysisReducer.functionData,
  selectedNode: state.projectAnalysisReducer.selectedNode,
  loader: state.projectAnalysisReducer.loader
});

export default connect(
  mapStateToProps,
  { setSelectedNode }
)(withRouter(withStyles(styles)(FullGraph)));
