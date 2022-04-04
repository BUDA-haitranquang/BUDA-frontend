import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { color4 } from "../../CreateOrder";
import { useDispatch, useSelector } from "react-redux";

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
  return <Paper className={classes.root}>Name:{customer?.name}</Paper>;
}
