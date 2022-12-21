import { Box, Grid, Toolbar } from "@mui/material";
import BudaPieChart from "../../../buda-components/charts/BudaPieChart";
import BudaLegend from "../../../buda-components/charts/BudaLegend";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_TOTAL_SPEND_AGE_BY_USER } from "../../../graphQl/statistics/statisticQueries";
// import { LOAD_TOTAL_SPEND_AGE_THIS_MONTH_BY_USER } from "../../../graphQl/statistics/statisticQueries";
const AgeGroupSellOrder = () => {
  const {
    error: ageError,
    loading: ageLoading,
    data: ageData
  } = useQuery(LOAD_TOTAL_SPEND_AGE_BY_USER);
  const [age, setAge] = useState([]);
  const COLORSAGEGROUP = [
    "#8884d8",
    "#83a6ed",
    "#8dd1e1",
    "#82ca9d",
    "#a4de6c",
    "#d0ed57",
    "#ffc658"
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
          <h1> Sell order by age group</h1>
          {age.length !== 0 ? <BudaLegend
            data={age}
            colors={COLORSAGEGROUP}
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          /> : <h6>No data</h6>}
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
        {age.length !== 0 &&
          <BudaPieChart
            legend={false}
            data={age}
            colors={COLORSAGEGROUP}
            width="100%"
            height={500}
          />}
      </Grid>
    </Grid>
  );
};

export default AgeGroupSellOrder;
