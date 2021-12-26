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

  // const [currentTab, setCurrentTab] = useState(0);
  // const handleChange = (e, newValue) => {
  //   setCurrentTab(newValue);
  // };
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Dashboard" />
      <Box sx ={{width:'100%'}}>
        <Toolbar />
        {/* <Box pt={1}>
          <Tabs value={currentTab} onChange={handleChange}>
            <Tab
              label="Unfinished order"
              // component={Link}
              // to="/dashboard/unfinishedOrder"
            />
            <Tab label="Revenue" />
          </Tabs>
        </Box>
        {currentTab === 0 && <UnfinishedOrder />}
        {currentTab === 1 && <Revenue />} */}
        <Box sx={{width:'100%'}}>
        <MainDashBoard/>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
