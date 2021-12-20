import { Grid } from "@mui/material";
import React from "react";
import EditableMoneyBox from "../../common/moneybox/EditableMoneyBox";
import UneditableMoneyBox from "../../common/moneybox/UneditableMoneyBox";

export default function CostGrid() {
  return (
    <Grid
      container
      className="costPane"
      justifyContent="space-evenly"
      sx={{ marginTop: "10px" }}
    >
      <UneditableMoneyBox xs={4} title="Total" />
      <EditableMoneyBox xs={4} title="Discount" />
      <UneditableMoneyBox xs={4} title="Final" />
    </Grid>
  );
}
