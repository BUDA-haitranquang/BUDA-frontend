import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
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
  legendPosition = "bottom",
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
        <XAxis dataKey={xAxis} />
        <YAxis unit={yUnit} />
        <Tooltip />
        {legend && (
          <Legend
            verticalAlign={
              legendPosition === "bottom" ? legendPosition : "middle"
            }
            align={legendPosition === "bottom" ? "center" : "right"}
            layout={legendPosition === "bottom" ? "horizontal" : "vertical"}
          />
        )}

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
