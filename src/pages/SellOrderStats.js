import React from "react";
import { Box } from "@mui/material";
import AgeGroupSellOrder from "../components/statistics/sellorder/AgeGroupSellOrder";
import GenderSellOrder from "../components/statistics/sellorder/GenderSellOrder";

const SellOrderStats = (props) => {
  return (
    <Box sx={{ display: "flex" }}>
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
