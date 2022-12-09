import { Box, Button, ButtonGroup, Grid } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useEffect, useState } from "react";
import BudaLineChart from "../../buda-components/charts/BudaLineChart";
import BudaBarChart from "../../buda-components/charts/BudaBarChart";
import { useQuery } from "@apollo/client";
import {
  LOAD_BUSINESS_OVERALL_30_DAY,
  LOAD_BUSINESS_OVERALL_EVERY_MONTH,
  LOAD_BUSINESS_OVERALL_EVERY_WEEK,
  LOAD_BUSINESS_OVERALL_EVERY_YEAR
} from "../../graphQl/revenue statistics/businessOverallStatistics";
import BudaDatePicker from "../../buda-components/datepicker/BudaDatePicker";
const info = [
  { name: "revenue", color: "#82ca9d", datakey: "revenue" },
  { name: "expense", color: "#DC143C", datakey: "expense" }
  // { name: "profit", color: "#00BFFF", datakey: "profit" },
];

const Revenue = () => {
  const [chart, setChart] = useState(0);
  const [timeSelected, setTimeSelected] = useState(0);
  const [revenue, setRevenue] = useState([]);
  const [dayBegin, setDayBegin] = useState(new Date());
  const [dayEnd, setDayEnd] = useState(new Date());

  const { error: dayRevenueError, data: dayRevenueData } = useQuery(
    LOAD_BUSINESS_OVERALL_30_DAY
  );
  const { error: weekRevenueError, data: weekRevenueData } = useQuery(
    LOAD_BUSINESS_OVERALL_EVERY_WEEK
  );
  const { error: monthRevenueError, data: monthRevenueData } = useQuery(
    LOAD_BUSINESS_OVERALL_EVERY_MONTH
  );
  const { error: yearRevenueError, data: yearRevenueData } = useQuery(
    LOAD_BUSINESS_OVERALL_EVERY_YEAR
  );

  const scaleData = (data) =>
    data.map((item) => {
      let object = {};
      object.expense = item.expense / 1000;
      object.profit = item.profit / 1000;
      object.revenue = item.revenue / 1000;
      object.timePeriod = item.timePeriod;
      return object;
    });

  useEffect(() => {
    async function fetchData() {
      if (timeSelected === 0 && dayRevenueData) {
        setRevenue(scaleData(dayRevenueData.businessOverallXDays));
        return;
      }
      if (timeSelected === 1 && weekRevenueData) {
        setRevenue(scaleData(weekRevenueData.businessOverallEveryWeek));
        return;
      }
      if (timeSelected === 2 && monthRevenueData) {
        setRevenue(scaleData(monthRevenueData.businessOverallEveryMonth));
        return;
      }
      if (timeSelected === 3 && yearRevenueData) {
        setRevenue(scaleData(yearRevenueData.businessOverallEveryYear));
        return;
      }
    }

    fetchData();
  }, [
    timeSelected,
    dayRevenueData,
    weekRevenueData,
    monthRevenueData,
    yearRevenueData
  ]);

  const handleChooseDate = (timeSelected, callback) => {
    setTimeSelected(timeSelected);
    // callback()
  };

  return (
    <Grid container spacing={1} sx={{ width: "100%" }}>
      <Grid
        item
        flexDirection="column"
        sm={14}
        md={9}
        sx={{
          height: "80vh"
        }}
      >
        {revenue.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              paddingTop: "25%",
              paddingBottom: "25%"
            }}
          >
            <h1>No data</h1>
          </Box>
        ) : (
          <>
            <Box
              pt={2}
              sx={{ width: "100%", paddingBottom: "10px" }}
              display="flex"
              justifyContent="space-between"
            >
              <Box>
                <h1 style={{ margin: "10px 0 0 30px " }}>
                  {chart % 2 === 0 ? "Line Chart" : "Bar Chart"}
                </h1>
              </Box>
              <Box pt={1}>
                <ButtonGroup sx={{ paddingRight: "30px" }}>
                  <Button
                    variant={chart === 1 ? "contained" : "outlined"}
                    onClick={() => setChart(1)}
                  >
                    <BarChartIcon />
                  </Button>
                  <Button
                    variant={chart === 0 ? "contained" : "outlined"}
                    onClick={() => setChart(0)}
                  >
                    <ShowChartIcon />
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
            {chart % 2 === 0 ? (
              <BudaLineChart
                yUnit="k"
                data={revenue}
                info={info}
                xAxis="timePeriod"
              />
            ) : (
              <BudaBarChart
                yUnit="k"
                data={revenue}
                info={info}
                xAxis="timePeriod"
              />
            )}
          </>
        )}
      </Grid>

      <Grid item xs display="flex" flexDirection="column">
        <Box sx={{ height: "85px" }}></Box>
        <Box width="100%" sx={{ height: "80vh" }}>
          <Grid containter sx={{ height: "100%" }}>
            <Grid item xs={12}>
              <Button
                variant={timeSelected === 0 ? "contained" : "outlined"}
                sx={{ width: "100%", height: "55px" }}
                onClick={() => handleChooseDate(0)}
              >
                Day{" "}
              </Button>
              <Box py={2}></Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant={timeSelected === 1 ? "contained" : "outlined"}
                sx={{ width: "100%", height: "55px" }}
                onClick={() => handleChooseDate(1)}
              >
                Week
              </Button>
              <Box py={2}></Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                sx={{ width: "100%", height: "55px" }}
                variant={timeSelected === 2 ? "contained" : "outlined"}
                onClick={() => handleChooseDate(2)}
              >
                Month
              </Button>
              <Box py={2}></Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                sx={{ width: "100%", height: "55px" }}
                variant={timeSelected === 3 ? "contained" : "outlined"}
                onClick={() => handleChooseDate(3)}
              >
                Year
              </Button>
              <Box py={3}></Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "row" }}>
                <BudaDatePicker onlyDate={true} setValue={setDayBegin} />
                <Box
                  px={1}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "blue",
                  }}
                >
                  To
                </Box>
                <BudaDatePicker onlyDate={true} setValue={setDayEnd} />
              </Box>
              <Box py={1}></Box>
              <Button
                sx={{ width: "100%", height: "40px" }}
                variant="outlined"
                onClick={() => handleChooseDate(4)}
              >
                {" "}
                Submit{" "}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Revenue;
