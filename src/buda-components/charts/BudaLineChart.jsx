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
  width = "100%",
  height = "100%",
  legend = true,
  xAxis,
  lines,
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
        <YAxis />
        <Tooltip />
        {legend && <Legend />}

        {lines.map((item) => {
          return (
            <Line
              type="linear"
              dataKey={item.dataKey}
              stroke={item.colors}
              name={item.name}
              activeDot={{ r: 8 }}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BudaLineChart;
