import { useQuery } from "@apollo/client";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import BudaLegend from "../../../buda-components/charts/BudaLegend";
import BudaPieChart from "../../../buda-components/charts/BudaPieChart";
import { LOAD_TOTAL_SPEND_AGE_BY_USER } from "../../../graphQl/statistics/statisticQueries";
import { useTranslation } from "react-i18next";
// import { LOAD_TOTAL_SPEND_AGE_THIS_MONTH_BY_USER } from "../../../graphQl/statistics/statisticQueries";
const AgeGroupSellOrder = () => {
  const { data: ageData } = useQuery(LOAD_TOTAL_SPEND_AGE_BY_USER);
  const [age, setAge] = useState([]);
  const { t } = useTranslation(["statistics"]);
  const COLORSAGEGROUP = [
    "#8884d8",
    "#83a6ed",
    "#8dd1e1",
    "#82ca9d",
    "#a4de6c",
    "#d0ed57",
    "#ffc658",
  ];
  useEffect(() => {
    async function fetchData() {
      if (ageData) {
        let chartData = [];
        await ageData.totalSpendAgeGroupByUser.forEach((e) =>
          chartData.push({ name: e.ageGroup, value: e.totalSpend })
        );
        setAge(chartData);
      }
    }

    fetchData();
  }, [ageData]);
  return (
    <Grid
      container
      sx={{ width: "100%", height: "50vh" }}
      display="flex"
      flexWrap="wrap"
    >
      <Grid item xs={6} display="flex" justifyContent="center">
        <Box>
          <h1>{t("statistics:sellOrder.ageGroupTitle")}</h1>
          {age.length !== 0 ? (
            <BudaLegend
              data={age}
              colors={COLORSAGEGROUP}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            />
          ) : (
            <h6>No data</h6>
          )}
        </Box>
      </Grid>

      <Grid
        items
        xs={6}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {age.length !== 0 && (
          <BudaPieChart
            legend={false}
            data={age}
            colors={COLORSAGEGROUP}
            width="100%"
            height={500}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default AgeGroupSellOrder;
