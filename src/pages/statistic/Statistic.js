import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Grid, Tab, Tabs, Toolbar } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import PChart from "../../components/statistic_chart/PieCharts";
import RChart from "../../components/statistic_chart/RadarCharts";

const GENDER = [
  { name: "nam", value: 500 },
  { name: "nữ", value: 800 },
  { name: "unknown", value: 100 }
];

const COLORSGENDER = ["#5DD6F4", "#ffc0cb", "#AEAEAE"];

// const AGE_GROUP = [
//   { name: 'FROM_0_TO_12', value: 500  },
//   { name: 'FROM_12_TO_18', value: 900},
//   { name: 'FROM_18_TO_24', value: 100},
//   { name: 'FROM_24_TO_30', value: 1222},
//   { name: 'FROM_30_TO_40', value: 234},
//   { name: 'FROM_40_TO_50', value: 231},
//   { name: 'FROM_50_TO_65', value: 342},
//   { name: 'FROM_65_AND_ABOUT', value: 321},
//   { name: 'UNKNOWN', value: 901},
// ];

//const COLORSAGEGROUP = ['#3f92cd','#ce0e8a','#63f661','#ee8d7b','#d9fe7e','#fd2666','#804f10','#93effe',,'#4a968c'] 

const AGE_GROUP = [
  {
    name: "0-12",
    uv: 6.67,
    pv: 4800,
    fill: "#f0c658"
  },
  {
    name: "12-18",
    uv: 6.67,
    pv: 4800,
    fill: "#ffc608"
  },
  {
    name: "18-24",
    uv: 31.47,
    pv: 2400,
    fill: "#8884d8"
  },
  {
    name: "24-30",
    uv: 26.69,
    pv: 4567,
    fill: "#83a6ed"
  },
  {
    name: "30-40",
    uv: 15.69,
    pv: 1398,
    fill: "#8dd1e1"
  },
  {
    name: "40-50",
    uv: 8.22,
    pv: 9800,
    fill: "#82ca9d"
  },
  {
    name: "50-65",
    uv: 8.63,
    pv: 3908,
    fill: "#a4de6c"
  },
  {
    name: "65+",
    uv: 2.63,
    pv: 4800,
    fill: "#d0ed57"
  },
  {
    name: "unknow",
    uv: 6.67,
    pv: 4800,
    fill: "#ffc658"
  }
];


function Statistic(props) {
  const { window } = props;

  const [currentTab, setCurrentTab] = useState(0);
  const handleChange = (e, newValue) => {
    setCurrentTab(newValue);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Dashboard" id="statistic"/>
      <Box sx={{ width: "100%" }}>
        <Toolbar />
        <Box pt={1}>
          <Tabs value={currentTab} onChange={handleChange}>
            <Tab label="Daily statistic" />
            <Tab label="Monthly statistic" />
            <Tab label="Anual statistic" />
          </Tabs>
        </Box>
        <Grid container sx={{ width: "100%", height: "100vh" }} display="flex" flexWrap="wrap">
          <Grid items xs={6}
                display="flex"
                flexDirection="column"
                alignItems="center">
            <h1>GENDER</h1>
            <PChart title="Gender" data={GENDER} colors={COLORSGENDER} />
          </Grid>
          <Grid items xs={6}
                display="flex"
                flexDirection="column"
                alignItems="center">
            <h1>AGE GROUP</h1>
            <RChart data={AGE_GROUP} />
            {/* <PChart title = 'Age group' data = {AGE_GROUP} colors = {COLORSAGEGROUP}/> */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Statistic;
