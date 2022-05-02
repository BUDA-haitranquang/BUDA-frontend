import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import AgeGroupSellOrder from "../components/statistics/sellorder/AgeGroupSellOrder";
import GenderSellOrder from "../components/statistics/sellorder/GenderSellOrder";

const SellOrderStats = (props) => {
  const { window } = props;
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Sell order " id="business" />
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box py={2}></Box>
        <GenderSellOrder />
        <AgeGroupSellOrder />
        {/*  */}
      </Box>
    </Box>
  );
};

export default SellOrderStats;
