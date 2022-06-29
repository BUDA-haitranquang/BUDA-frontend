import {
  Box,
  Divider,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { dateToDateString } from "../../utils/utils";

const BuyOrderDetailPrintForm = React.forwardRef((props, ref) => {
  const buyOrder = props.buyOrderPrintInfo?.buyOrder;
  const store = props.buyOrderPrintInfo?.store;

  return (
    <div ref={ref}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "20px 20px 20px 40px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Typography variant="h4">{store?.name}</Typography>
          <Typography>Address: {store?.address}</Typography>
          <Typography>Staff: {buyOrder?.staff?.name}</Typography>
        </Box>

        <Divider>
          <Typography variant="h6">Supplier Information</Typography>{" "}
        </Divider>
        <Box sx={{ marginBottom: "12px" }}>
          <Typography variant="h6">{buyOrder?.supplier?.name}</Typography>
          <Typography>Address: {buyOrder?.supplier?.address}</Typography>
          <Typography>Phone: {buyOrder?.supplier?.phoneNumber}</Typography>
        </Box>

        <Divider>
          <Typography variant="h6">List Items</Typography>{" "}
        </Divider>
        <Box>
          <TableBody>
            <TableRow>
              <TableCell>
                <b>SKU</b>
              </TableCell>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Price</b>
              </TableCell>
              <TableCell>
                <b>Quantity</b>
              </TableCell>
            </TableRow>
            {buyOrder?.buyOrderItems.map((item) => (
              <TableRow>
                <TableCell align="left">{item?.ingredient?.sku}</TableCell>
                <TableCell align="left">{item?.ingredient?.name}</TableCell>
                <TableCell align="right">
                  {item?.pricePerUnit.toLocaleString()}
                </TableCell>
                <TableCell align="left">{item?.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="h6">
            Total Cost: {buyOrder?.totalCost.toLocaleString()}
          </Typography>
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          Time: {dateToDateString(buyOrder?.finishTime)}
        </Box>
      </Paper>
    </div>
  );
});

export default BuyOrderDetailPrintForm;
