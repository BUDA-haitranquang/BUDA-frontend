import { useState } from "react";
import Box from "@material-ui/core/Box";
import { Grid } from "@mui/material";
// import BudaBarChart from "../../buda-components/charts/BudaBarChart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
  Cell,
  ResponsiveContainer,
} from "recharts";
import Product from "../../pages/Product";

const color = [
  "#a3d0d0",
  "#93c9c9",
  "#84c1c1",
  "#75b9b9",
  "#66b2b2",
  "#5ba0a0",
  "#518e8e",
  "#477c7c",
  "#3d6a6a",
  "#335959",
];

const ProductsStatObject = ({ label, data, dataKey,unit }) => {
  return (
    <Grid sx={{ width: "100%" }}>
      <Grid item>
        <h1 style ={{marginLeft:'20px'}}>{label}</h1>
      </Grid>
      <Grid item sx={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer width={"95%"} height={"95%"}>
          <BarChart
            width={400}
            height={300}
            data={data}
            style={{
              marginLeft: "10px",
              marginBottom: "80px",
            }}
          >
            <XAxis
              type="category"
              dataKey="name"
              height={110}
              tick={{
                fontSize: "15px",
                width: "50px",
                wordWrap: "break-word",
              }}
              interval={0}
            />
            <YAxis unit={unit} allowDecimals= {false} domain = {[0,dataMax => Math.ceil(dataMax*1.2)]}/>
            <Tooltip />

            <Bar
              maxBarSize={100}
              BarSize={100}
              dataKey={dataKey}
              // fill={"#82ca9d"}
            >
              <LabelList datakey={dataKey} position="top" />
              {data.map((item, idx) => {
                return <Cell fill={color[10 - idx]} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
};

export default ProductsStatObject;
