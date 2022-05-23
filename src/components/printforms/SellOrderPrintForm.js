import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const SellOrderPrintForm = React.forwardRef(( props, ref ) => {
  return (
    <div ref={ref}>
      <Paper
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box>
          <Typography variant="h6">Store name</Typography>
          <Typography>Store address</Typography>
          <Typography>Phone number</Typography>
          <Typography>Current time</Typography>
        </Box>
        <Box>
          <Typography>Customer name</Typography>
          <Typography>Customer address</Typography>
          <Typography>Customer phone</Typography>
          <Typography>Points</Typography>
        </Box>
        <Box>Line items info</Box>
        <Box>
          <Typography>Real cost</Typography>
          <Typography>Actual discount cash</Typography>
          <Typography>Actual discount %</Typography>
          <Typography>Points</Typography>
        </Box>
        <Box>
          <Typography>Other information</Typography>
        </Box>
      </Paper>
    </div>
  );
});

export default SellOrderPrintForm;
