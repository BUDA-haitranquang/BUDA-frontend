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
import IncompletedSellOrder from "./IncompletedSellOrder";
import IncompletedBuyOrder from "./IncompletedBuyOrder";
import IncompletedFixedCostBill from "./IncompletedFixedCostBill";
import IncompletedOtherCost from "./IncompletedOtherCost";
import { useTranslation } from "react-i18next";

const MainDashBoard = () => {
  const { t } = useTranslation(["dashboard"]);
  const [chart, setChart] = useState(0);
  const [revenue, setRevenue] = useState([]);
  const [tab, setTab] = useState(0);
  const { data: dayRevenueData } = useQuery(LOAD_BUSINESS_OVERALL_30_DAY);

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

  const fillStatisticData = (initialData) => {
    let result = [];

    const lastDateForStatistic = new Date();
    const startDateForStatistic = new Date(
      lastDateForStatistic.getFullYear(),
      lastDateForStatistic.getMonth(),
      lastDateForStatistic.getDate() - 30
    );

    let curDate = startDateForStatistic;

    if (initialData.length === 0) {
      let upperBound = new Date(
        lastDateForStatistic.getFullYear(),
        lastDateForStatistic.getMonth(),
        lastDateForStatistic.getDate()
      );
      while (curDate.getTime() !== upperBound.getTime()) {
        result = [
          ...result,
          {
            expense: 0,
            profit: 0,
            revenue: 0,
            timePeriod: `${curDate.getDate()}-${
              curDate.getMonth() + 1
            }-${curDate.getFullYear()}`,
          },
        ];
        curDate.setDate(curDate.getDate() + 1);
      }
      return result;
    }

    let upperBoundDate = initialData[0].timePeriod.split("-")[0];
    let upperBoundMonth = initialData[0].timePeriod.split("-")[1];
    let upperBoundYear = initialData[0].timePeriod.split("-")[2];

    let upperBound = new Date(
      upperBoundYear,
      upperBoundMonth - 1,
      upperBoundDate
    );
    for (let i = 0; i < initialData.length; i++) {
      while (curDate.getTime() !== upperBound.getTime()) {
        result = [
          ...result,
          {
            expense: 0,
            profit: 0,
            revenue: 0,
            timePeriod: `${curDate.getDate()}-${
              curDate.getMonth() + 1
            }-${curDate.getFullYear()}`,
          },
        ];
        curDate.setDate(curDate.getDate() + 1);
      }

      result = [...result, initialData[i]];
      curDate.setDate(curDate.getDate() + 1);

      if (i !== initialData.length - 1) {
        let upperBoundDate = initialData[i + 1].timePeriod.split("-")[0];
        let upperBoundMonth = initialData[i + 1].timePeriod.split("-")[1];
        let upperBoundYear = initialData[i + 1].timePeriod.split("-")[2];
        upperBound = new Date(
          upperBoundYear,
          upperBoundMonth - 1,
          upperBoundDate
        );
      } else {
        upperBound = new Date(
          lastDateForStatistic.getFullYear(),
          lastDateForStatistic.getMonth(),
          lastDateForStatistic.getDate()
        );
      }
    }

    while (curDate.getTime() < upperBound.getTime()) {
      result = [
        ...result,
        {
          expense: 0,
          profit: 0,
          revenue: 0,
          timePeriod: `${curDate.getDate()}-${
            curDate.getMonth() + 1
          }-${curDate.getFullYear()}`,
        },
      ];
      curDate.setDate(curDate.getDate() + 1);
    }

    return result;
  };

  useEffect(() => {
    async function fetchData() {
      if (dayRevenueData) {
        let statisticData = fillStatisticData(
          dayRevenueData.businessOverallXDays
        );
        setRevenue(scaleData(statisticData));
        return;
      }
    }
    fetchData();
  }, [dayRevenueData]);

  const info = [
    { name: t("dashboard:revenue"), color: "#82ca9d", datakey: "revenue" },
    { name: t("dashboard:expense"), color: "#DC143C", datakey: "expense" },
  ];

  return (
    <Box width="100%">
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid
          item
          flexDirection="column"
          sm={12}
          sx={{
            height: "200px",
          }}
        >
          {revenue.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                paddingTop: "10%",
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
                    {t("dashboard:overview")}
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
                  legend={true}
                  legendPosition="right"
                />
              ) : (
                <BudaBarChart
                  yUnit="k"
                  data={revenue}
                  info={info}
                  xAxis="timePeriod"
                  legend={true}
                  legendPosition="right"
                />
              )}
            </>
          )}
        </Grid>
      </Grid>
      <Box py={5}></Box>

      <Box>
        <Tabs value={tab} onChange={handleChangeTab}>
          <Tab label={t("dashboard:sellOrder.title")} />
          <Tab label={t("dashboard:buyOrder.title")} />
          <Tab label={t("dashboard:fixedCost.title")} />
          <Tab label={t("dashboard:otherCost.title")} />
        </Tabs>
      </Box>
      <Divider />
      <Box py={2}></Box>
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
