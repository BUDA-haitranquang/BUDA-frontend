import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Revenue from "src/pages/statistic/Revenue";
const RevenuePage = (props) => {
  const { window } = props;

  return (
    <Box sx={{ display: "flex" }}>
      {/* <Sidebar window={window} name="Revenue and cost" id="statistic" /> */}
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Toolbar />
        <Box>{}</Box>

        <Revenue />
      </Box>
    </Box>
  );
};

export default RevenuePage;
