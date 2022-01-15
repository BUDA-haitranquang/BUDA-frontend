import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateTotalDiscount,
  calculateTotalPrice,
} from "../../../../redux/productCartSlice";
import EditableMoneyBox from "../../common/moneybox/EditableMoneyBox";
import UneditableMoneyBox from "../../common/moneybox/UneditableMoneyBox";

export default function CostGrid() {
  const { totalPrice } = useSelector((state) => state.productCart);
  const [discount, setDiscount] = useState(0);
  const dispatch = useDispatch();
  dispatch(calculateTotalPrice());

  const changeDiscountPrice = (e) => {
    const tmpDiscount = totalPrice > e.target.value ? e.target.value : totalPrice;
    setDiscount(tmpDiscount);
    dispatch(calculateTotalDiscount(tmpDiscount));
  };

  return (
    <Grid
      container
      className="costPane"
      justifyContent="space-evenly"
      sx={{ marginTop: "10px" }}
    >
      <UneditableMoneyBox xs={4} title="Total" value={totalPrice} />
      <EditableMoneyBox
        xs={4}
        title="Discount"
        value={discount}
        onChange={changeDiscountPrice}
      />
      <UneditableMoneyBox xs={4} title="Final" value={totalPrice - discount} />
    </Grid>
  );
}
