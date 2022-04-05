import { Grid, Box, Button, ButtonGroup } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import react, { useEffect, useState } from "react";
import BudaDatePicker from "../../buda-components/datepicker/BudaDatePicker";
import BudaLineChart from "../../buda-components/charts/BudaLineChart";
import BudaBarChart from "../../buda-components/charts/BudaBarChart";
import { useQuery } from "@apollo/client";
import {
  LOAD_TOTAL_REVENUE_DAY,
  LOAD_TOTAL_REVENUE_MONTH,
  LOAD_TOTAL_REVENUE_WEEK,
  LOAD_TOTAL_REVENUE_YEAR,
} from "../../graphQl/revenue statistics/revenueStatisticsQueries";
import {
  LOAD_TOTAL_EXPENSE_MONTH,
  LOAD_TOTAL_EXPENSE_DAY,
  LOAD_TOTAL_EXPENSE_YEAR,
  LOAD_TOTAL_EXPENSE_WEEK,
} from "../../graphQl/revenue statistics/expenseStatisticsQueries";
const info = [
  { name: "revenue", color: "#82ca9d", datakey: "revenue" },
  { name: "expense", color: "#12ca9d", datakey: "expense" },
];

const MainDashBoard = () => {
  const [chart, setChart] = useState(0);
  const [timeSelected, setTimeSelected] = useState(0);
  const [revenue, setRevenue] = useState([]);
  const [dayBegin, setDayBegin] = useState(new Date());
  const [dayEnd, setDayEnd] = useState(new Date());

  const { error: dayRevenueError, data: dayRevenueData } = useQuery(
    LOAD_TOTAL_REVENUE_DAY
  );
  const { error: weekRevenueError, data: weekRevenueData } = useQuery(
    LOAD_TOTAL_REVENUE_WEEK
  );
  const { error: monthRevenueError, data: monthRevenueData } = useQuery(
    LOAD_TOTAL_REVENUE_MONTH
  );
  const { error: yearRevenueError, data: yearRevenueData } = useQuery(
    LOAD_TOTAL_REVENUE_YEAR
  );

  const { error: dayExpenseError, data: dayExpenseData } = useQuery(
    LOAD_TOTAL_EXPENSE_DAY
  );
  const { error: weekExpenseError, data: weekExpenseData } = useQuery(
    LOAD_TOTAL_EXPENSE_WEEK
  );
  const { error: monthExpenseError, data: monthExpenseData } = useQuery(
    LOAD_TOTAL_EXPENSE_MONTH
  );
  const { error: yearExpenseError, data: yearExpenseData } = useQuery(
    LOAD_TOTAL_EXPENSE_YEAR
  );
  useEffect(() => {
    async function fetchData() {
      if (timeSelected === 0 && dayRevenueData && dayExpenseData) {
        const scaleData = dayRevenueData.totalRevenueDay.map((item) => {
          let object = {};
          object.revenue = item.revenue / 1000;
          object.timePeriod = item.timePeriod  
          return object;
        });
        setRevenue(scaleData);
        return ;
      }
      if (timeSelected === 1 && weekRevenueData && weekExpenseData) {
        const scaleData = weekRevenueData.totalRevenueWeek.map((item) => {
          let object = {};
          object.revenue = item.revenue / 1000;
          object.timePeriod = item.timePeriod  
          return object;
        });
        setRevenue(scaleData);
        return;
      }
      if (timeSelected === 2 && monthRevenueData && monthExpenseData) {
        const scaleData = monthRevenueData.totalRevenueMonth.map((item) => {
          let object = {};
          object.revenue = item.revenue / 1000;
          object.timePeriod = item.timePeriod  
          return object;
        });
        setRevenue(scaleData);
        return;
      }
      if (timeSelected === 3 && yearRevenueData && yearExpenseData) {
        const scaleData = yearRevenueData.totalRevenueYear.map((item) => {
          let object = {};
          object.revenue = item.revenue / 1000;
          object.timePeriod = item.timePeriod  
          return object;
        });
        setRevenue(scaleData);
        return;
      }
    }
    fetchData();
  }, [
    timeSelected,
    dayRevenueData,
    weekRevenueData,
    monthRevenueData,
    yearRevenueData,
    dayExpenseData,
    weekExpenseData,
    monthExpenseData,
    yearExpenseData,
  ]);


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
        {revenue.length === 0 ? (
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
