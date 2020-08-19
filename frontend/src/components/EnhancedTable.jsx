// this will house the season component and some other stuff
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableBody from "./EnhancedTableBody";
import {
  TableContainer,
  Table,
  FormControlLabel,
  Switch,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {};
});

function EnhancedTable({ headCells, rows }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("number");
  const [dense, setDense] = useState(false);
  const classes = useStyles();


  const onRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  return (
    <TableContainer>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <Table aria-label="simple table" size={dense ? "small" : "medium"}>
        <EnhancedTableHead
          headCells={headCells}
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort}
        />
        <EnhancedTableBody
          rows={rows}
          order={order}
          orderBy={orderBy}
          stableSort={stableSort}
          getComparator={getComparator}
        />
      </Table>
    </TableContainer>
  );
}

EnhancedTable.propTypes = {
  headCells: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default EnhancedTable;
