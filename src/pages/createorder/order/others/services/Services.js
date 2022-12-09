import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { color4 } from "../../../CreateOrder";
import ServiceItem from "./ServiceItem";

const useStyle = makeStyles(() => ({
  root: {
    backgroundColor: `${color4}`,
    border: "2px solid gray",
    padding: "8px",
    overflow: "hidden",
    "& .MuiTableContainer-root": {
      height: "34vh",
    },
    "& .MuiTable-root": {
      backgroundColor: "yellow",
    },
    "& .MuiTableHead-root": {
      "& .MuiTableCell-root": {
        fontSize: "18px",
        fontWeight: "600",
        padding: "5px",
      },
    },
    "& .MuiTableBody-root": {
      "& .MuiTableCell-root": {
        height: "100%",
        padding: "6px",
      },
    },
  },
}));

const headCells = [
  {
    id: "no",
    numeric: false,
    disablePadding: false,
    label: "No.",
    size: 1,
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
    size: 4,
  },
  {
    id: "sellingPrice",
    numeric: true,
    disablePadding: true,
    label: "Price",
    size: 2,
  },
  {
    id: "qty",
    numeric: true,
    disablePadding: true,
    label: "Qty.",
    size: 2,
  },
  {
    id: "total",
    numeric: true,
    disablePadding: true,
    label: "Total",
    size: 3,
  },
];

const initData = [
  {
    no: 1,
    name: "Rước cup",
    qty: 1,
    price: 10000,
    total: 10000,
  },
];

export default function Services() {
  const classes = useStyle();
  const [rows, setRows] = useState(initData);
  return (
    <Grid xs={8} item className="services">
      <Typography
        fullwidth
        align="center"
        variant="h6"
        sx={{ fontWeight: 600 }}
      >
        Other Cost & Services
      </Typography>

      <Paper className={classes.root}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? "right" : "left"}
                    sx={{
                      width: `calc(100% / 12 * ${headCell.size})`,
                    }}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return <ServiceItem row={row} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
}
