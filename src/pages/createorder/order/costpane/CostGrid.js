import { Grid } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotalPrice } from "../../../../redux/productCartSlice";
import EditableMoneyBox from "../../common/moneybox/EditableMoneyBox";
import UneditableMoneyBox from "../../common/moneybox/UneditableMoneyBox";

export default function CostGrid() {
  const { totalPrice } = useSelector((state) => state.productCart);
  const dispatch = useDispatch();
  dispatch(calculateTotalPrice());

  return (
    <Grid
      container
      className="costPane"
      justifyContent="space-evenly"
      sx={{ marginTop: "10px" }}
    >
      <UneditableMoneyBox xs={4} title="Total" value={totalPrice}/>
      <EditableMoneyBox xs={4} title="Discount" />
      <UneditableMoneyBox xs={4} title="Final" />
    </Grid>
  );
}
