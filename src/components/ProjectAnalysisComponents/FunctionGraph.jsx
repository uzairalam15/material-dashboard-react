import React from "react";
import ReactEcharts from "echarts-for-react";
import { graphFlow } from "variables/graphs";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { treeDummyData } from "variables/graphs";

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
  }
});

class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "radial"
    };

    this.data = treeDummyData;
    this.echarts_react = null;
  }

  getRadialOptions = state => {
    console.log("asd");
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

        top: "18%",
        bottom: "14%",
        left: "14%",
        roam: true,

        symbolSize: 7,
        expandAndCollapse: true,

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
    console.log(params);
  };

  render() {
    let onEvents = {
      click: this.onChartClick
    };

    const { classes, item } = this.props;
    return (
      <div style={{ marginTop: 50 }}>
        {/* <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="type">Type</InputLabel>
            <Select
              name="type"
              value={this.state.type}
              onChange={this.handleChange}
            >
              <MenuItem value={"orthogonal"}>Orthogonal</MenuItem>
              <MenuItem value={"radial"}>Radial</MenuItem>
            </Select>
          </FormControl>
        </form> */}
        {this.state.type === "radial" ? (
          <ReactEcharts
            ref={e => {
              this.echarts_react = e;
            }}
            option={this.getRadialOptions(this.state)}
            style={{ height: item.h * 120, width: "100%" }}
            onEvents={onEvents}
          />
        ) : (
          <ReactEcharts
            ref={e => {
              this.echarts_react = e;
            }}
            option={this.getOption(this.state)}
            style={{ height: item.h * 120, width: "100%" }}
            onEvents={onEvents}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Tree);
