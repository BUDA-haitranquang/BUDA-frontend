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

export default function EditableMoneyBox({ title, value, onChange }) {
  const classes = useStyle();
  return (
    <Grid className={classes.root}>
      <Typography
        variant="h6"
        align="center"
        fontFamily="'Montserrat', san-serif"
        fontWeight="bold"
        sx={{ textTransform: "uppercase" }}
      >
        {title}
      </Typography>
      <TextField
        sx={{ background: "rgb(232, 243, 255, 0.2)" }}
        InputProps={{ disableUnderline: true }}
        inputProps={{
          style: { textAlign: "center" },
        }}
        fullWidth
        variant="outlined"
        value={value}
        onChange={onChange}
      />
    </Grid>
  );
}
