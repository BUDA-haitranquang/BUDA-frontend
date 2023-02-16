import { Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyle = makeStyles(() => ({
  root: {
    "& .MuiOutlinedInput-input": {
      padding: "3px 5px 3px 3px",
    },
  },
}));

export default function UneditableMoneyBox({ title, value }) {
  const classes = useStyle();
  return (
    <Grid className={classes.root}>
      <Typography
        variant="h6"
        align="center"
        sx={{ textTransform: "uppercase" }}
        fontWeight="bold"
      >
        {title}
      </Typography>
      <TextField
        sx={{ background: "rgb(232, 243, 255, 0.2)" }}
        InputProps={{ disableUnderline: true }}
        inputProps={{
          style: { textAlign: "center" },
        }}
        // type={"number"}
        disabled
        fullWidth
        variant="outlined"
        value={value}
      />
    </Grid>
  );
}
