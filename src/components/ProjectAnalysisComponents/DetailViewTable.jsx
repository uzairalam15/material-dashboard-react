import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: "left"
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

function CustomizedTable(props) {
  const { classes, data, height } = props;
  const PaperCustom = withStyles(theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit * 3,
      overflowX: "auto",
      overflowY: "scroll",
      height: height - 20
    }
  }))(Paper);

  return (
    <PaperCustom className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Label</CustomTableCell>
            <CustomTableCell numeric>Value</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => {
            return (
              <TableRow className={classes.row} key={row.id}>
                <CustomTableCell component="th" scope="row">
                  {row.label}
                </CustomTableCell>
                <CustomTableCell component="th" scope="row">
                  {row.value}
                </CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </PaperCustom>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedTable);
