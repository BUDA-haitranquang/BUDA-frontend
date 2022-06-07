import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Reveneu from "../../components/statistics/Reveneu";
const ReveneuPage = (props) => {
  const { window } = props;

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Reveneu and cost" id="statistic" />
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Toolbar />
        <Box>{}</Box>

        
          <Reveneu />
        
      </Box>
    </Box>
  );
};

export default ReveneuPage;
