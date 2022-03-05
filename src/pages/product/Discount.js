import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Toolbar, Tabs, Tab } from "@mui/material";
import Sidebar from '../../components/Sidebar';
import DiscountByPercentage from "../../components/discount/DiscountByPercentage";
import DiscountByCash from "../../components/discount/DiscountByCash";
function Discount(props) {
  const { window } = props;
  const [currentTab, setCurrentTab] = useState(0);
  const handleChange = (e, newValue) => {
    setCurrentTab(newValue);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Discount" />
      <Box sx ={{width:'100%'}}>
        <Toolbar />
        <Box pt={1}>
          <Tabs value={currentTab} onChange={handleChange}>
            <Tab
              label="Giảm giá theo phần trăm"
              // component={Link}
              // to="/dashboard/unfinishedOrder"
            />
            <Tab label="Giảm giá theo tiền" />
          </Tabs>
        </Box>
        <Box sx={{width:'100%'}}>
        <Box py ={1}></Box>
        {currentTab === 1 && <DiscountByCash/>}
        {currentTab === 0 &&  <DiscountByPercentage/>}
        </Box>
      </Box>
    </Box>
  );
}

export default Discount;
