import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Divider,
  Tab,
  Tabs,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useEffect, useState } from "react";
import BudaLineChart from "../../buda-components/charts/BudaLineChart";
import BudaBarChart from "../../buda-components/charts/BudaBarChart";
import { useQuery } from "@apollo/client";
import { LOAD_BUSINESS_OVERALL_30_DAY } from "../../graphQl/revenue statistics/businessOverallStatistics";
import { makeStyles } from "@mui/styles";
import IncompletedSellOrder from "./IncompletedSellOrder";
import IncompletedBuyOrder from "./IncompletedBuyOrder";
import IncompletedFixedCostBill from "./IncompletedFixedCostBill";
import IncompletedOtherCost from "./IncompletedOtherCost";
const useStyle = makeStyles({
  box: {
    width: "100%",
    height: "150px",
    backgroundColor: "#1976D2",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

const info = [
  { name: "revenue", color: "#82ca9d", datakey: "revenue" },
  { name: "expense", color: "#DC143C", datakey: "expense" },
];

const MainDashBoard = () => {
  const [chart, setChart] = useState(0);
  const [revenue, setRevenue] = useState([]);
  const classes = useStyle();
  const [tab, setTab] = useState(0);
  const { error: dayRevenueError, data: dayRevenueData } = useQuery(
    LOAD_BUSINESS_OVERALL_30_DAY
  );

  const handleChangeTab = (e, val) => {
    setTab(val);
  };
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
      if (dayRevenueData) {
        setRevenue(scaleData(dayRevenueData.businessOverallXDays));
        return;
      }
    }
    fetchData();
  }, [dayRevenueData]);


  return (
    <Box width="100%">
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid
          item
          flexDirection="column"
          sm={14}
          md={9}
          sx={{
            height: "200px",
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
                    {/* {chart % 2 === 0 ? "Line Chart" : "Bar Chart"} */}
                    Overview
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
                  legend={false}
                />
              ) : (
                <BudaBarChart
                  yUnit="k"
                  data={revenue}
                  info={info}
                  xAxis="timePeriod"
                  legend={false}
                />
              )}
            </>
          )}
        </Grid>

        <Grid
          item
          xs
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box py={5} px="100%"></Box>
          <Box className={classes.box}>
            <h4 style={{ margin: "0 0 0 0", color: "white" }}>Total Revenue</h4>
            <h1 style={{ margin: "0 0 0 0", color: "white " }}>1000</h1>
          </Box>
        </Grid>
      </Grid>
      <Box py={3}></Box>
      <Divider />
      <Box>
        <Tabs value={tab} onChange={handleChangeTab}>
          <Tab label="Sell Order" />
          <Tab label="Buy Order" />
          <Tab label="Fixed Cost" />
          <Tab label="Other Cost" />
        </Tabs>
      </Box>
      <Divider />
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {tab === 0 && <IncompletedSellOrder />}
        {tab === 1 && <IncompletedBuyOrder />}
        {tab === 2 && <IncompletedFixedCostBill />}
        {tab === 3 && <IncompletedOtherCost />}
      </Box>
    </Box>
  );
};

export default MainDashBoard;
