import { Grid, Box, Button, ButtonGroup } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import react, { useEffect, useState } from "react";
import BudaDatePicker from "../../buda-components/datepicker/BudaDatePicker";
import BudaLineChart from "../../buda-components/charts/BudaLineChart";
import BudaBarChart from "../../buda-components/charts/BudaBarChart";
import { useQuery } from "@apollo/client";
import {
  LOAD_REVENUE_MONTHLY,
  LOAD_REVENUE_WEEKLY,
  LOAD_REVENUE_WEEKDAYS,
  LOAD_REVENUE_DAYS_THIS_MONTH,
} from "../../graphQl/revenue statistics/revenueStatisticsQueries";
const info = [{ name: "revenue", color: "#82ca9d", datakey: "revenue" }];

const MainDashBoard = () => {
  const [chart, setChart] = useState(0);
  const [timeSelected, setTimeSelected] = useState(0);
  const [data, setData] = useState([]);
  const [dayBegin, setDayBegin] = useState(new Date());
  const [dayEnd, setDayEnd] = useState(new Date());

  const { error: monthlyError, data: monthlyData } =
    useQuery(LOAD_REVENUE_MONTHLY);
  const { error: weeklyError, data: weeklyData } =
    useQuery(LOAD_REVENUE_WEEKLY);
  const { error: daysThisMonthError, data: daysThisMonthData } = useQuery(
    LOAD_REVENUE_DAYS_THIS_MONTH
  );
  const { error: weekdaysError, data: weekdaysData } = useQuery(
    LOAD_REVENUE_WEEKDAYS
  );

  useEffect(() => {
    async function fetchData() {
      if (timeSelected === 0 && daysThisMonthData) {
        setData(daysThisMonthData.revenueDaysThisMonth);
        return;
      }
      if (timeSelected === 1 && weekdaysData) {
        setData(weekdaysData.revenueWeekdays);
        return;
      }
      if (timeSelected === 2 && weeklyData) {
        setData(weeklyData.revenueWeekly);
        return;
      }
      if (timeSelected === 3 && monthlyData) {
        setData(monthlyData.revenueMonthly);
        return;
      }
    }
    fetchData();
  }, [timeSelected]);

  const handleChooseDate = (timeSelected, callback) => {
    setTimeSelected(timeSelected);
    // callback()
  };

  return (
    <Grid container spacing={2} sx={{ width: "100%" }}>
      <Grid
        item
        flexDirection="column"
        sm={12}
        md={8}
        sx={{
          height: "80vh",
        }}
      >
        {data.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              paddingTop: "25%",
              paddingBottom: "25%",
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
              <BudaLineChart data={data} info={info} xAxis="timePeriod" />
            ) : (
              <BudaBarChart data={data} info={info} xAxis="timePeriod" />
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
                Day in this month{" "}
              </Button>
              <Box py={2}></Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant={timeSelected === 1 ? "contained" : "outlined"}
                sx={{ width: "100%", height: "55px" }}
                onClick={() => handleChooseDate(1)}
              >
                Weekdays
              </Button>
              <Box py={2}></Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                sx={{ width: "100%", height: "55px" }}
                variant={timeSelected === 2 ? "contained" : "outlined"}
                onClick={() => handleChooseDate(2)}
              >
                Weekly
              </Button>
              <Box py={2}></Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                sx={{ width: "100%", height: "55px" }}
                variant={timeSelected === 3 ? "contained" : "outlined"}
                onClick={() => handleChooseDate(3)}
              >
                Monthly
              </Button>
              <Box py={3}></Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "row" }}>
                <BudaDatePicker onlyDate={true} setValue={setDayBegin} />
                <Box
                  px={2}
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

export default MainDashBoard;
