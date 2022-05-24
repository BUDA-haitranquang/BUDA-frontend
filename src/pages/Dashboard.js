import * as React from "react";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import Sidebar from "../components/Sidebar";
import DashBoard from "../components/dashboard/DashBoard";

function Dashboard(props) {
  const { window } = props;

  // const [currentTab, setCurrentTab] = useState(0);
  // const handleChange = (e, newValue) => {
  //   setCurrentTab(newValue);
  // };
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Dashboard" id="dashboard" />
      <Box sx={{ width: "100%" }}>
        <Toolbar />
        <Box sx={{ width: "100%" }}>
          <DashBoard />
        </Box>
        
      </Box>
    </Box>
  );
}

export default Dashboard;
