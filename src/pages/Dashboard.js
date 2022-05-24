import * as React from "react";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import Sidebar from "../components/Sidebar";
import DashBoard from "../components/dashboard/DashBoard";
import { useTranslation } from "react-i18next";
function Dashboard(props) {
  const { window } = props;
  const {t} = useTranslation('dashboard');
  // const [currentTab, setCurrentTab] = useState(0);
  // const handleChange = (e, newValue) => {
  //   setCurrentTab(newValue);
  // };
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name={t('dashboard:title')} id="dashboard" />
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
