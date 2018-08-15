import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Chip from "@material-ui/core/Chip";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";

//other component
import Loader from "components/Loader";
// child components
import ChildRows from "./ChildRows";

const styles = theme => ({
  expansion: {
    border: "1px solid lightgrey",
    borderRadius: 5
  },
  createButton: {
    marginRight: 10
  },
  summary: {
    borderBottom: "1px solid lightgrey"
  },
  details: {
    alignItems: "center",
    padding: 0,
    paddingLeft: 15,
    paddingRight: 15
  },
  column: {
    flexBasis: "33.33%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    color: "black",
    textTransform: "capitalize",
    textAlign: "left"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: "grey",
    textTransform: "capitalize",
    textAlign: "left"
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  column: {
    flexBasis: "33.33%"
  }
});

class Row extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loader: false
    };
  }

  checkSubProjects = rowState => {
    const state = { open: rowState };
    this.setState(state);
  };

  toggleRow = () => {
    this.checkSubProjects(!this.state.open);
  };

  render() {
    const { classes, item } = this.props;
    const { open, loader } = this.state;
    return (
      <ExpansionPanel
        className={classes.expansion}
        expanded={open}
        onChange={this.toggleRow}
      >
        <ExpansionPanelSummary
          className={classes.summary}
          expandIcon={<ExpandMoreIcon />}
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{item.id}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.heading}>{item.name}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {`Author: ${item.author}`}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {`Status: ${item.status}`}
            </Typography>
          </div>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(Row);
