import { Grid, Box, Button, ButtonGroup } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";

import { useState } from "react";
import BudaLineChart from "../../buda-components/charts/BudaLineChart";
import BudaBarChart from "../../buda-components/charts/BudaBarChart";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const lines = [
  { name: "Chi phí", colors: "#CD201F", dataKey: "uv" },
  { name: "Doanh thu", colors: "#82ca9d", dataKey: "pv" },
];
const MainDashBoard = () => {
  const [chart, setChart] = useState(0);
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
            <ButtonGroup>
              <Button onClick={() => setChart(1)}>
                <BarChartIcon />
              </Button>
              <Button onClick={() => setChart(0)}>
                <ShowChartIcon />
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
        {chart % 2 === 0 ? (
          <BudaLineChart data={data} xAxis="name" lines={lines} />
        ) : (
          <BudaBarChart data={data} xAxis="name" bars={lines} />
        )}
      </Grid>
      <Grid item display="flex" flexDirection="column" rowSpacing={2}>
        <Box width="100%">
          <Grid containter spacing={2}>
            <Grid item xs={12}>
              Place holder
            </Grid>
            <Grid item xs={12}>
              Place holder
            </Grid>
            <Grid item xs={12}>
              Place holder
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainDashBoard;
