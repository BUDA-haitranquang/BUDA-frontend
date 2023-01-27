import color from "src/theme/color";
import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
  Box,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

const EnhancedTableHead = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  headCells,
  isNotShowCheckbox = false,
}) => {
  const createSortHandler = (props) => (event) => {
    onRequestSort(event, props);
  };

  return (
    <TableHead>
      <TableRow>
        {!isNotShowCheckbox && (
          <TableCell padding="checkbox" sx={{ backgroundColor: color.PRIMARY }}>
            <Checkbox
              color="primary"
              checked={
                rowCount > 0 && numSelected <= rowCount && numSelected > 0
              }
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all" }}
            />
          </TableCell>
        )}
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sx={{
              backgroundColor: color.PRIMARY,
              borderRadius:
                isNotShowCheckbox === true
                  ? index === 0
                    ? "10px 0px 0px 0px"
                    : index === headCells.length - 1
                    ? "0px 10px 0px 0px"
                    : "0px"
                  : "0px",
            }}
          >
            <TableSortLabel
              sx={{
                color: color.PRIMARY_LIGHT,
                "&:hover": { color: color.PRIMARY_LIGHT },
              }}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography
                fontFamily="'Andika', san serif"
                sx={{ color: color.PRIMARY_LIGHT }}
              >
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
