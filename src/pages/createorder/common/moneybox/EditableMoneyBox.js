import { Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyle = makeStyles(() => ({
  root: {},
}));

export default function EditableMoneyBox({ title }) {
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
      />
    </Grid>
  );
}
