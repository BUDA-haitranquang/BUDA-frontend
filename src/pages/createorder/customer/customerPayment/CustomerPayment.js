import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditableMoneyBox from "../../common/moneybox/EditableMoneyBox";
import UneditableMoneyBox from "../../common/moneybox/UneditableMoneyBox";

export default function CustomerPayment() {
  const { totalPrice, discount } = useSelector((state) => state.productCart);
  const [customerGiveAmount, setCustomerGiveAmount] = useState(
    totalPrice - discount
  );

  useEffect(()=>{
    setCustomerGiveAmount(totalPrice - discount);
  }, [totalPrice, discount])

  const handleCustomerGiveChange = (e) => {
    // const finalPaymentTmp = totalPrice - discount;
    // const tmp = e.target.value > finalPaymentTmp ? e.target.value : finalPaymentTmp;
    setCustomerGiveAmount(e.target.value);
  }
  return (
    <Grid
      container
      className="customerPayPane"
      justifyContent="space-evenly"
      sx={{ marginTop: "10px" }}
    >
      <EditableMoneyBox
        xs={4}
        title="Customer gives"
        value={customerGiveAmount}
        onChange={handleCustomerGiveChange}
      />
      <UneditableMoneyBox xs={4} title="Change" value={customerGiveAmount - (totalPrice - discount)}/>
    </Grid>
  );
}
