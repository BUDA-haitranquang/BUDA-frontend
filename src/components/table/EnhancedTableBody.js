import React from "react";
import { TableBody, TableRow, TableCell, Checkbox } from "@mui/material";
import { getComparator, stableSort } from "../../utils/tableUtils";
import { Link } from "react-router-dom";

const EnhancedTableBody = ({
  order,
  orderBy,
  selected,
  page,
  rowPerPage,
  setSelected,
  data,
}) => {
  const handleClick = (e, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  console.log(data);
  return (
    <TableBody>
      {stableSort(data, getComparator(order, orderBy)).map((row, idx) => {
        const isItemSelected = isSelected(row.name);
        const labelId = `enhanced-table-checkbox-${idx}`;
        return (
          <TableRow
            sx={{ cursor: "pointer" }}
            hover
            onClick={(e) => handleClick(e, row.name)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.name}
            selected={isItemSelected}
          >
            <TableCell align="center" padding="checkbox">
              <Checkbox
                color="primary"
                checked={isItemSelected}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </TableCell>
            <TableCell align="right">{row.id}</TableCell>
            <TableCell component="th" id={labelId} scope="row" padding="none">
              <Link to={{
                pathname: `product/${row.id}`, 
                state: {data: row}}}
              >
                {row.name}
              </Link>
            </TableCell>

            <TableCell align="right">{row.price}</TableCell>
            <TableCell align="right">{row.amount}</TableCell>
            <TableCell align="right">{row.cost}</TableCell>
            <TableCell align="left">{row.group}</TableCell>
            <TableCell align="left">{row.description}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default EnhancedTableBody;
