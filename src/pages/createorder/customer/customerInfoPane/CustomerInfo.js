import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { color4 } from "../../CreateOrder";

const useStyle = makeStyles(() => ({
  root: {
    backgroundColor: `${color4}`,
    border: "2px solid gray",
    padding: "8px",
    overflow: "hidden",
    height: "40vh"
  },
}));

export default function CustomerInfo() {
  const classes = useStyle();
  return <Paper className={classes.root}>
    abc
  </Paper>;
}
