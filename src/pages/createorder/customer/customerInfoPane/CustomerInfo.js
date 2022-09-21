import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCustomer } from "../../../../redux/productCartSlice";
import { useTranslation } from "react-i18next";
const useStyle = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "8px",
    boxShadow: "none",
    overflow: "hidden",
    flexGrow: 1,
    height: "calc(100%-8px)",
    "& .MuiTableCell-root": {
      padding: "4px",
    },
  },
}));

export default function CustomerInfo() {
  const classes = useStyle();
  const { t } = useTranslation("sell");
  const dispatch = useDispatch();
  const { customer } = useSelector((state) => state.productCart);
  return (
    customer && (
      <Paper className={classes.root}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography
                  fontFamily="'Montserrat', san-serif"
                  fontWeight="bold"
                >
                  {t("sell:customerInfo.name")}:
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: "none" }}>
                <Typography
                  fontFamily="'Montserrat', san-serif"
                  fontStyle="italic"
                >
                  {customer?.name}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography
                  fontFamily="'Montserrat', san-serif"
                  fontWeight="bold"
                >
                  {t("sell:customerInfo.phone")}:
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: "none" }}>
                <Typography
                  fontFamily="'Montserrat', san-serif"
                  fontStyle="italic"
                >
                  {customer?.phonenumber}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography
                  fontFamily="'Montserrat', san-serif"
                  fontWeight="bold"
                >
                  {t("sell:customerInfo.totalSpend")}:
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: "none" }}>
                <Typography
                  fontFamily="'Montserrat', san-serif"
                  fontStyle="italic"
                >
                  {customer?.totalSpend?.toLocaleString() || 0}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography
                  fontFamily="'Montserrat', san-serif"
                  fontWeight="bold"
                >
                  {t("sell:customerInfo.gender")}:
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: "none" }}>
                <Typography
                  fontFamily="'Montserrat', san-serif"
                  fontStyle="italic"
                >
                  {customer?.gender}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography
                  fontFamily="'Montserrat', san-serif"
                  fontWeight="bold"
                >
                  {t("sell:customerInfo.ageGroup")}:
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: "none" }}>
                <Typography
                  fontFamily="'Montserrat', san-serif"
                  fontStyle="italic"
                >
                  {customer?.ageGroup}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography
                  fontFamily="'Montserrat', san-serif"
                  fontWeight="bold"
                >
                  {t("sell:customerInfo.address")}:
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: "none" }}>
                <Typography
                  fontFamily="'Montserrat', san-serif"
                  fontStyle="italic"
                >
                  {customer?.address}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box
          sx={{
            marginTop: "20px",
            marginBottom: "5px",
            width: "100%",
            borderBottom: "2px rgba(0, 0, 0, 0.4)",
            borderBottomStyle: "dashed",
          }}
        ></Box>
        <Button
          endIcon={<CloseIcon />}
          sx={{
            color: "#ed4545",
            // marginTop: "24px",
            // width: "80%",
            // alignSelf: "center",
            // backgroundImage: "linear-gradient(to right, #ed4545, #ff6b6b)",
            boxShadow: "none",
          }}
          onClick={() => dispatch(setCustomer(null))}
        >
          {t("sell:remove")}
        </Button>
      </Paper>
    )
  );
}
