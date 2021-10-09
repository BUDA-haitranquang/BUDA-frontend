import React, { useState } from "react";
import { TableBody, TableRow, TableCell, Checkbox } from "@mui/material";
import data from "../../assets/data";
import { getComparator, stableSort } from "../../utils/tableUtils";

const EnhancedTableBody = ({
  order,
  orderBy,
  selected,
  page,
  rowPerPage,
  setSelected,
}) => {
  const handleClick = (e, name) => {
    console.log(typeof selected);
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

  //   const emptyRows =
  //     page > 0 ? Math.max(0, (1 + page) * rowPerPage - data.length) : 0;

  return (
    <TableBody>
      {stableSort(data, getComparator(order, orderBy))
        .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
        .map((row, idx) => {
          const isItemSelected = isSelected(row.name);
          const labelId = `enhanced-table-checkbox-${idx}`;
          return (
            <TableRow
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
                {row.name}
              </TableCell>

              <TableCell align="right">{row.phoneNumber}</TableCell>
              <TableCell align="left">{row.address}</TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
};

export default EnhancedTableBody;
