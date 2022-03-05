import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Toolbar, Tabs, Tab } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import UnfinishedOrder from "../components/dashboard/UnfinishedOrder";
import Revenue from "../components/dashboard/Revenue";
import MainDashBoard from "../components/dashboard/MainDashBoard";
function Dashboard(props) {
  const { window } = props;


  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Dashboard" />
      <Box sx ={{width:'100%'}}>
        <Toolbar />
        
        <Box sx={{width:'100%'}}>
        <MainDashBoard/>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
