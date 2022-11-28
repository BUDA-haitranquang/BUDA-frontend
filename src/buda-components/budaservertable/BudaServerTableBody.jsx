import { Checkbox, TableBody, TableCell, TableRow } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/styles";
import React from "react";
import { getComparator, stableSort } from "../../utils/tableUtils";

const BudaTableBody = (props) => {
  const {
    DetailTableBody,
    order,
    orderBy,
    selected,
    page,
    rowPerPage,
    setSelected,
    data,
    isNotShowCheckbox = false,
    type,
    ...remainProps
  } = props;

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

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });
  const isSelected = (name) => selected.indexOf(name) !== -1;
  return (
    <TableBody {...remainProps}>
      {stableSort(data, getComparator(order, orderBy)).map((row, idx) => {
        const isItemSelected = isSelected(row[type]);
        const labelId = `enhanced-table-checkbox-${idx}`;
        return (
          <CustomWidthTooltip title={row.description || ""}>
            <TableRow
              sx={{ cursor: "pointer" }}
              hover
              onClick={(e) => {
                if (isNotShowCheckbox) return;
                return handleClick(e, row[type]);
              }}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.id}
              selected={isItemSelected}
            >
              {isNotShowCheckbox ? (
                <></>
              ) : (
                <TableCell align="center" padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </TableCell>
              )}
              <DetailTableBody row={row} labelId={labelId} />
            </TableRow>
          </CustomWidthTooltip>
        );
      })}
    </TableBody>
  );
};

export default BudaTableBody;
