import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditableMoneyBox from "../../common/moneybox/EditableMoneyBox";
import UneditableMoneyBox from "../../common/moneybox/UneditableMoneyBox";
import { useTranslation } from "react-i18next";
export default function CustomerPayment() {
  const { totalPrice, discount } = useSelector((state) => state.productCart);
  const { t } = useTranslation(["sell"]);
  const [customerGiveAmount, setCustomerGiveAmount] = useState(
    totalPrice - (discount?.cash || 0)
  );

  useEffect(() => {
    setCustomerGiveAmount(totalPrice - (discount?.cash || 0));
  }, [totalPrice, discount]);

  const handleCustomerGiveChange = (e) => {
    // const finalPaymentTmp = totalPrice - discount;
    // const tmp = e.target.value > finalPaymentTmp ? e.target.value : finalPaymentTmp;
    setCustomerGiveAmount(e.target.value);
  };
  return (
    <Grid
      container
      className="customerPayPane"
      justifyContent="space-evenly"
      sx={{ marginTop: "10px" }}
    >
      <EditableMoneyBox
        xs={4}
        title={t("sell:customerGives")}
        value={customerGiveAmount}
        onChange={handleCustomerGiveChange}
      />
      <UneditableMoneyBox
        xs={4}
        title={t("sell:change")}
        value={customerGiveAmount - (totalPrice - (discount?.cash || 0))}
      />
    </Grid>
  );
}
