import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { color4 } from "../../CreateOrder";
import { useSelector } from "react-redux";
import OrderProductItem from "./OrderProductItem";
import { useTranslation } from "react-i18next";
const useStyle = makeStyles(() => ({
  root: {
    // backgroundColor: `${color4}`,
    // border: "2px solid gray",
    borderRadius: "10px",
    padding: "8px",
    overflow: "hidden",
    boxShadow: "none",
    "& .MuiTableContainer-root": {
      minHeight: "36vh",
    },
    // "& .MuiTable-root": {
    //   backgroundColor: "yellow",
    // },
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

export default function OrderProducts() {
  const classes = useStyle();
  const [rows, setRows] = useState([]);
  const { productCart } = useSelector((state) => state.productCart);
  const { t } = useTranslation(["sell"]);

  const headCells = [
    {
      id: "no",
      numeric: false,
      disablePadding: false,
      label: t("sell:productTable.number"),
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
      label: t("sell:productTable.name"),
      size: 4,
    },
    {
      id: "sellingPrice",
      numeric: true,
      disablePadding: true,
      label: t("sell:productTable.price"),
      size: 2,
    },
    {
      id: "qty",
      numeric: true,
      disablePadding: true,
      label: t("sell:productTable.quantity"),
      size: 1,
    },
    {
      id: "total",
      numeric: true,
      disablePadding: true,
      label: t("sell:productTable.total"),
      size: 2,
    },
  ];

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
                  <Typography
                    noWrap
                    fontWeight="bold"
                    fontFamily="'Andika', san-serif"
                  >
                    {headCell.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => {
              return (
                <OrderProductItem
                  row={row}
                  serial={rows.indexOf(row) + 1}
                  key={idx}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
