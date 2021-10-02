import * as React from "react";

import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import Sidebar from "../components/Sidebar";

function Dashboard(props) {
  const { window } = props;
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Dashboard" />
      <Box>
        <Toolbar />
        <Box pt={1}>content here</Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
