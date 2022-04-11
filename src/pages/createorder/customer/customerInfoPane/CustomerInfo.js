import { Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useSelector } from "react-redux";
import { color4 } from "../../CreateOrder";

const useStyle = makeStyles(() => ({
  root: {
    backgroundColor: `${color4}`,
    border: "2px solid gray",
    padding: "8px",
    overflow: "hidden",
    height: "40vh",
  },
}));

export default function CustomerInfo() {
  const classes = useStyle();
  const { customer } = useSelector((state) => state.productCart);
  return (
    <Paper className={classes.root}>
      <Typography>Name: {customer?.name}</Typography>
      <Typography>Phone: {customer?.phoneNumber}</Typography>
      <Typography>Address: {customer?.address}</Typography>
    </Paper>
  );
}
