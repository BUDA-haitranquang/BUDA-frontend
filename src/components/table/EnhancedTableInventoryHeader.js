import React from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
  Box,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { makeStyles, styled } from "@mui/styles";

const useStyle = makeStyles({
  root: {
    "& .MuiButtonBase-root-MuiTableSortLabel-root":{
      align:"center"
    },
    "& .MuiSvgIcon-root-MuiTableSortLabel-icon":{
        align:"center"
    }
  },
});


const EnhancedTableHead = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  headCells,
}) => {
  const createSortHandler = (props) => (event) => {
    onRequestSort(event, props);
  };
  const classes = useStyle();
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell 
          
            key={headCell.id}
            //align={headCell.numeric ? "right" : "left"}
            // align="center"
            align={headCell.label==="Name" ? "left" : "center"}
            sx={{
              fontWeight: "600",
              align : "center"
            }}
          >
            <TableSortLabel
              className={classes.root}
              sx = {headCell.label==="Name" ? {pl : 2} : {pl : 3}}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              
            >
              {headCell.label}
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
