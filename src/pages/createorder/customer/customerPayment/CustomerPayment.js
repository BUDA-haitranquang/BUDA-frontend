import { Grid } from "@mui/material";
import React from "react";
import EditableMoneyBox from "../../common/moneybox/EditableMoneyBox";
import UneditableMoneyBox from "../../common/moneybox/UneditableMoneyBox";

export default function CustomerPayment() {
  return (
    <Grid
      container
      className="customerPayPane"
      justifyContent="space-evenly"
      sx={{ marginTop: "10px" }}
    >
      <EditableMoneyBox xs={4} title="Customer gives" />
      <UneditableMoneyBox xs={4} title="Change" />
    </Grid>
  );
}
