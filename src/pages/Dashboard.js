import * as React from "react";
import Box from "@mui/material/Box";
import DashBoard from "../components/dashboard/DashBoard";
import { useTranslation } from "react-i18next";
function Dashboard(props) {
  const { t } = useTranslation("dashboard");
  // const [currentTab, setCurrentTab] = useState(0);
  // const handleChange = (e, newValue) => {
  //   setCurrentTab(newValue);
  // };
  return (
    <Box m={3}>
      <DashBoard />
    </Box>
  );
}

export default Dashboard;
