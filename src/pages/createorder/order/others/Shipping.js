import { Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { color2 } from "../../CreateOrder";

export default function Shipping() {
  return (
    <Grid xs={4} item className="shipping">
      <Typography
        fullwidth
        align="center"
        variant="h6"
        sx={{ fontWeight: 600 }}
      >
        Shipping Fee
      </Typography>
      <Typography
        fullwidth
        align="center"
        variant="h6"
        sx={{ fontWeight: 600, color: `${color2}` }}
      >
        11000
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <TextField
          label=" Customer pays:"
          variant="standard"
          sx={{ width: "45%", padding: "2px" }}
        />
        <TextField
          label=" Shop pays:"
          variant="standard"
          sx={{ width: "40%", padding: "2px" }}
        />
      </Box>
    </Grid>
  );
}
