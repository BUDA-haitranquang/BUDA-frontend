import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCustomer } from "../../../../redux/productCartSlice";
import { color4 } from "../../CreateOrder";

const useStyle = makeStyles(() => ({
  root: {
    backgroundColor: `${color4}`,
    border: "2px solid gray",
    padding: "8px",
    overflow: "hidden",
    height: "40vh",
    "& .MuiTableCell-root": {
      padding: "4px",
    },
  },
}));

export default function CustomerInfo() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { customer } = useSelector((state) => state.productCart);
  return (
    customer && (
      <Paper className={classes.root}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Name:</TableCell>
              <TableCell align="right">
                <i>{customer?.name}</i>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phone:</TableCell>
              <TableCell align="right">
                <i>{customer?.phonenumber}</i>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Spend:</TableCell>
              <TableCell align="right">
                <i>{customer?.totalSpend?.toLocaleString() || 0}</i>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gender:</TableCell>
              <TableCell align="right">
                <i>{customer?.gender}</i>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Age Group:</TableCell>
              <TableCell align="right">
                <i>{customer?.ageGroup}</i>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Address:</TableCell>
              <TableCell align="right">
                <i>{customer?.address}</i>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          variant="contained"
          color="error"
          endIcon={<DeleteIcon />}
          sx={{ marginTop: "24px" }}
          onClick={() => dispatch(setCustomer(null))}
        >
          Remove
        </Button>
      </Paper>
    )
  );
}
