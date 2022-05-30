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
import { useTranslation } from "react-i18next";
const useStyle = makeStyles(() => ({
  root: {
    backgroundColor: `${color4}`,
    border: "2px solid gray",
    padding: "8px",
    overflow: "hidden",
    height: "39vh",
    "& .MuiTableCell-root": {
      padding: "4px",
    },
  },
}));

export default function CustomerInfo() {
  const classes = useStyle();
  const {t} = useTranslation('sell');
  const dispatch = useDispatch();
  const { customer } = useSelector((state) => state.productCart);
  return (
    customer && (
      <Paper className={classes.root}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>{t('sell:customerInfo.name')}:</TableCell>
              <TableCell align="right">
                <i>{customer?.name}</i>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('sell:customerInfo.phone')}:</TableCell>
              <TableCell align="right">
                <i>{customer?.phonenumber}</i>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('sell:customerInfo.totalSpend')}:</TableCell>
              <TableCell align="right">
                <i>{customer?.totalSpend?.toLocaleString() || 0}</i>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('sell:customerInfo.gender')}:</TableCell>
              <TableCell align="right">
                <i>{customer?.gender}</i>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('sell:customerInfo.ageGroup')}:</TableCell>
              <TableCell align="right">
                <i>{customer?.ageGroup}</i>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('sell:customerInfo.address')}:</TableCell>
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
          {t('sell:remove')}
        </Button>
      </Paper>
    )
  );
}
