import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const SellOrderDetailPrintForm = React.forwardRef((props, ref) => {
  console.log(props);
  const sellOrder = props.sellOrder;
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
          <Typography>Customer name: {sellOrder.customer.name}</Typography>
          <Typography>Address: {sellOrder.customer.address}</Typography>
          <Typography>Phone: {sellOrder.customer.phoneNumber}</Typography>
          <Typography>Points: {sellOrder.customer.name}</Typography>
        </Box>
        <Box>Line items info</Box>
        <Box>
          <Typography>Real cost: {sellOrder.realCost}</Typography>
          <Typography>Final cost: {sellOrder.finalCost}</Typography>
        </Box>
        <Box>
          <Typography>Other information</Typography>
        </Box>
      </Paper>
    </div>
  );
});

export default SellOrderDetailPrintForm;
