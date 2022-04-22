import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { color4 } from "../../CreateOrder";
import { useDispatch, useSelector } from "react-redux";
import OrderProductItem from "./OrderProductItem";

const useStyle = makeStyles(() => ({
  root: {
    backgroundColor: `${color4}`,
    border: "2px solid gray",
    padding: "8px",
    overflow: "hidden",
    "& .MuiTableContainer-root": {
      height: "36vh",
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
    id: "sku",
    numeric: false,
    disablePadding: false,
    label: "SKU",
    size: 2,
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
    size: 1,
  },
  {
    id: "total",
    numeric: true,
    disablePadding: true,
    label: "Total",
    size: 2,
  },
];

export default function OrderProducts() {
  const classes = useStyle();
  const [rows, setRows] = useState([]);
  const { productCart } = useSelector((state) => state.productCart);

  useEffect(() => {
    async function fetchData() {
      if (productCart) setRows(productCart);
    }

    fetchData();
  }, [productCart]);

  return (
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
              return (
                <OrderProductItem
                  row={row}
                  serial={rows.indexOf(row) + 1}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
