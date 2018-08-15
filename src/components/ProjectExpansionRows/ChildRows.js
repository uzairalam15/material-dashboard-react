import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const CustomTableCell = withStyles(theme => ({
  head: {
    background: "linear-gradient(60deg, #26c6da, #00acc1)",
    fontSize: 12,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  table: {
    minWidth: 700,
    borderRadius: 5
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

class ChildRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openProject = e => {
    const index = e.target.getAttribute("data-index");
    const project = this.props.children[Number(index)];
    this.props.openProject(project);
  };

  getChildRow = (classes, children) => {
    if (children.length) {
      return (
        <Table tableHeaderColor="info" className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>#Id</CustomTableCell>
              <CustomTableCell>Name</CustomTableCell>
              <CustomTableCell>Author</CustomTableCell>
              <CustomTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {children.map((n, index) => {
              return (
                <TableRow className={classes.row} key={n.id}>
                  <CustomTableCell component="th" scope="row">
                    {n.id}
                  </CustomTableCell>
                  <CustomTableCell component="th" scope="row">
                    {n.name}
                  </CustomTableCell>
                  <CustomTableCell>{n.author}</CustomTableCell>
                  <CustomTableCell>
                    <Button
                      variant="contained"
                      dataIndex={index}
                      size="small"
                      color="primary"
                      onClick={this.openProject}
                    >
                      Open
                    </Button>
                  </CustomTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      );
    }
    return <h6>No Sub Projects</h6>;
  };

  render() {
    const { classes, children } = this.props;
    return this.getChildRow(classes, children);
  }
}

export default withStyles(styles)(ChildRow);
