import { Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

const useStyle = makeStyles(() => ({
  root: {},
}));

export default function EditableMoneyBox({ title, value, onChange }) {
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
      <TextField
        inputProps={{
          style: { textAlign: "right" },
        }}
        fullWidth
        variant="outlined"
        value={value}
        onChange={onChange}
      />
    </Grid>
  );
}
