import { Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyle = makeStyles(() => ({
  root: {},
}));

export default function UneditableMoneyBox({ title, value }) {
  const classes = useStyle();
  return (
    <Grid className={classes.root}>
      <Typography
        variant="h6"
        align="center"
        sx={{ textTransform: "uppercase" }}
      >
        {title}
      </Typography>
      <TextField disabled fullWidth variant="outlined" value={value} />
    </Grid>
  );
}
