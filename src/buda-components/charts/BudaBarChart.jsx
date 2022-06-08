import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BudaBarChart = ({
  data,
  xAxis,
  width = "100%",
  height = "100%",
  legend = true,
  info,
  yUnit = "",
  legendPosition = "bottom",
  ...props
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart
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
          <Bar dataKey={item.datakey} fill={item.color} name={item.name} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BudaBarChart;
