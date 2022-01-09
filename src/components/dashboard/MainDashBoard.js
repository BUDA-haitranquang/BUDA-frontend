import { Grid, Box, Button, ButtonGroup } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import LChart from "./Charts/LineCharts";
import BChart from "./Charts/BarCharts";
import  { useState } from "react";
import StickyHeadTable from "./table/Table";
import { makeStyles } from "@mui/styles";
const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },]

function createData(name, code) {
  return { name, code};
}

const rows = [
  createData("India", "IN", ),
  createData("China", "CN"),
  createData("Italy", "IT"),
  createData("United States", "US"),
  createData("Canada", "CA"),
  createData("Australia", "AU"),
  createData("Germany", "DE"),
  createData("Ireland", "IE"),
  createData("Mexico", "MX"),
  createData("Japan", "JP"),
  createData("France", "FR"),
  createData("United Kingdom", "GB"),
  createData("Russia", "RU"),
  createData("Nigeria", "NG"),
  createData("Brazil", "BR")
];

const useStyle = makeStyles({
  isSelected:{
    '&.MuiButton-root':{
      backgroundColor:'#1976d2',
      color:'white'}
}})

const MainDashBoard = () => {
  const classes = useStyle();
  const [chart, setChart] = useState(0);
  return (
    <Grid container spacing={2} sx={{ width: "100%" }}>
      <Grid
        item
        flexDirection="column"
        sm={12}
        md={8}
        sx={{
          height: "82vh",
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
              {chart === 0 ? "Line Chart" : "Bar Chart"}
            </h1>
          </Box>
          <Box pt={1} pr={4}>
            <ButtonGroup>
              <Button 
                className = {chart === 1 && classes.isSelected}
                onClick={()=>setChart(1)}>
                <BarChartIcon />
              </Button>
              <Button
                className = {chart === 0 && classes.isSelected}
                 onClick={()=>setChart(0)}>
                <ShowChartIcon/>
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
        {chart === 0 ? <LChart /> : <BChart />}
      </Grid>
      <Grid item xs display="flex" flexDirection="column" rowSpacing={2}>
        <Box py ={4}></Box>
        <Box width="100%">
          <Grid containter spacing={2}>
            <Grid item xs >
              <StickyHeadTable data={rows} columns={columns}/>
            </Grid>
            <Grid item xs>
              <StickyHeadTable data={rows} columns={columns}/>
            </Grid>
            <Grid item xs>
              <StickyHeadTable data={rows} columns={columns}/>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainDashBoard;
