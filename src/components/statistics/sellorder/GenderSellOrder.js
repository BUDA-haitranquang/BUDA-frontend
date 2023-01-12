import { useQuery } from "@apollo/client";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import BudaLegend from "../../../buda-components/charts/BudaLegend";
import BudaPieChart from "../../../buda-components/charts/BudaPieChart";
import { LOAD_TOTAL_SPEND_GENDER_BY_USER } from "../../../graphQl/statistics/statisticQueries";
// import { LOAD_TOTAL_SPEND_GENDER_THIS_MONTH_BY_USER } from "../../../graphQl/statistics/statisticQueries";
const GenderSellOrder = () => {
  const { data: genderData } = useQuery(LOAD_TOTAL_SPEND_GENDER_BY_USER);
  // const {error: genderThisMonthError,loading: genderThisMonthLoading,data: genderThisMonthGender} = useQuery(LOAD_TOTAL_SPEND_GENDER_THIS_MONTH_BY_USER);
  const [gender, setGender] = useState([]);
  const COLORSGENDER = ["#AEAEAE", "#5DD6F4", "#ffc0cb"];
  useEffect(() => {
    async function fetchData() {
      if (genderData) {
        let chartData = [];
        await genderData.totalSpendGenderByUser.forEach((e) =>
          chartData.push({ name: e.gender, value: e.totalSpend })
        );
        setGender(chartData);
      }
    }

    fetchData();
  }, [genderData]);

  return (
    <Grid
      container
      sx={{ width: "100%", height: "50vh" }}
      display="flex"
      flexWrap="wrap"
    >
      <Grid item xs={6} display="flex" justifyContent="center">
        <Box>
          <h1> Sell order by gender</h1>
          <BudaLegend
            data={gender}
            colors={COLORSGENDER}
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          />
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
        <BudaPieChart
          legend={false}
          data={gender}
          colors={COLORSGENDER}
          width="100%"
          height={500}
        />
      </Grid>
    </Grid>
  );
};
export default GenderSellOrder;
