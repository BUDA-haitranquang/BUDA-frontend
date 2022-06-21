import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Divider, Toolbar, Typography } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import { useQuery } from "@apollo/client";
import {
  LOAD_RETENTION_RATE_MOTHLY,
  LOAD_RETENTION_RATE_WEEKLY,
} from "../../graphQl/statistics/statisticQueries";
import BudaCircularChart from "../../buda-components/charts/BudaCircularChart";
function Retention(props) {
  const { window } = props;

  const { data: monthlyData } = useQuery(LOAD_RETENTION_RATE_MOTHLY);
  const { data: weeklyData } = useQuery(LOAD_RETENTION_RATE_WEEKLY);
  const [monthly, setMonthly] = useState(0);
  const [weekly, setWeekly] = useState(0);

  useEffect(() => {
    async function fetchData() {
      if (monthlyData && weeklyData) {
        setMonthly(monthlyData.retentionRateMonthly);
        setWeekly(weeklyData.retentionRateWeekly);
      }
    }

    fetchData();
  }, [monthlyData, weeklyData]);
  console.log(monthlyData);
  return (
    <Box sx={{ display: "flex" }}>
      {/* <Sidebar window={window} name="Retention" id="statistic"/> */}
      <Box sx={{ width: "100%" }}>
        <Toolbar />

        <Typography
          variant="caption"
          component="div"
          fontSize={32}
          align="center"
        >
          Retention rate
        </Typography>
        <Box pt={1} sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <BudaCircularChart
            value={weekly}
            size="200px"
            thickness="5"
            title="Weekly"
          />
          <BudaCircularChart
            value={monthly}
            size="200px"
            thickness="5"
            title="Monthly"
          />
        </Box>
        <Box py={1}></Box>
        <Divider />

        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box py={1}>hello</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Retention;
