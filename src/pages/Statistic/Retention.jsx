import { useQuery } from "@apollo/client";
import { Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import BudaCircularChart from "../../buda-components/charts/BudaCircularChart";
import {
  LOAD_RETENTION_RATE_MOTHLY,
  LOAD_RETENTION_RATE_WEEKLY
} from "../../graphQl/statistics/statisticQueries";
import { useTranslation } from "react-i18next";

const Retention = () => {
  const { data: monthlyData } = useQuery(LOAD_RETENTION_RATE_MOTHLY);
  const { data: weeklyData } = useQuery(LOAD_RETENTION_RATE_WEEKLY);
  const [monthly, setMonthly] = useState(0);
  const [weekly, setWeekly] = useState(0);
  const { t } = useTranslation(["statistics"]);

  async function fetchData() {
    if (monthlyData && weeklyData) {
      setMonthly(monthlyData.retentionRateMonthly);
      setWeekly(weeklyData.retentionRateWeekly);
    }
  }

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthlyData, weeklyData]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="caption"
          component="div"
          fontSize={32}
          align="center"
        >
          {t("statistics:retention.title")}
        </Typography>
        <Box pt={1} sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <BudaCircularChart
            value={weekly}
            size="200px"
            thickness={5}
            title={t("statistics:retention.weekly")}  
            color="error"
          />
          <BudaCircularChart
            value={monthly}
            size="200px"
            thickness={5}
            title={t("statistics:retention.monthly")}
            color="success"
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
};

export default Retention;
