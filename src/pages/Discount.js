import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Divider, Tab, Tabs, Toolbar } from "@mui/material";
import { useQuery } from "@apollo/client";
import { LOAD_DISCOUNTS } from "../graphQl/discounts/discountQueries";
import DiscountByPercentage from "../components/discount/DiscountByPercentage";

import DiscountByCash from "../components/discount/DiscountByCash";

function Discount(props) {
  const [currentTab, setCurrentTab] = useState(0);
  const { data } = useQuery(LOAD_DISCOUNTS);
  const [discountByPercentage, setDiscountByPercentage] = useState([]);
  const [discountByCash, setDiscountByCash] = useState([]);
  const handleChange = (e, newValue) => {
    setCurrentTab(newValue);
  };
  useEffect(() => {
    async function fetchData() {
      if (data) {
        setDiscountByCash(data.discountsByUser.filter(item => item.discountType === "CASH_ONLY" || item.discountType === "BOTH"));
        setDiscountByPercentage(data.discountsByUser.filter(item => item.discountType === "PERCENTAGE_ONLY" || item.discountType === "BOTH"));
      }
    }

    fetchData();
  }, [data]);
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "100%" }}>
        <Toolbar />
        <Box pt={1}>
          <Tabs value={currentTab} onChange={handleChange}>
            <Tab
              label="Discount by percentage"
              // component={Link}
              // to="/dashboard/unfinishedOrder"
            />
            <Tab label="Discount by cash" />
          </Tabs>
          <Divider />
        </Box>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box py={1}></Box>
          {currentTab === 1 && <DiscountByCash discounts={discountByCash} />}
          {currentTab === 0 && <DiscountByPercentage discounts={discountByPercentage} />}
        </Box>
      </Box>
    </Box>
  );
}

export default Discount;
