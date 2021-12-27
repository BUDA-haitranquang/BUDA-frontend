import { Grid, Box, Button, ButtonGroup } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import LChart from "./Charts/LineCharts";
import BChart from "./Charts/BarCharts";
import react, { useState } from "react";
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
            {/* <Button
              sx={{ height: "100%", margin: "10px 20px 0 0" }}
              onClick={(e) => setChart(chart + 1)}
            >
              {chart % 2 === 0 ? "Line Chart" : "Bar Chart"}
            </Button> */}
            <ButtonGroup>
              <Button onClick={()=>setChart(1)}>
                <BarChartIcon />
              </Button>
              <Button onClick={()=>setChart(0)}>
                <ShowChartIcon />
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
        {chart % 2 === 0 ? <LChart /> : <BChart />}
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
