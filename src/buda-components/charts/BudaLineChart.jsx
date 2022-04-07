import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BudaLineChart = ({
  data,
  info,
  xAxis,
  width = "100%",
  height = "100%",
  legend = true,
  yUnit,
  ...props
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis} />
        <YAxis unit={yUnit} />
        <Tooltip />
        {legend && <Legend />}
        {/* <Line type="linear" dataKey="pv" stroke="#CD201F" activeDot={{ r: 8 }} name = 'Chi phí'/>
          <Line type="linear" dataKey="uv" stroke="#82ca9d" name='Doanh thu' /> */}
        {info.map((item) => (
          <Line
            type="linear"
            dataKey={item.datakey}
            stroke={item.color}
            name={item.name}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BudaLineChart;
