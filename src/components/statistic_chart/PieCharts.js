import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer,Legend,Tooltip } from 'recharts';

const style = {
  //top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  //lineHeight: '24px',
};

const PChart = ({data,colors,title})=> {
    const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

    return (
    <> 
      <ResponsiveContainer width="100%" height="60%">
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius='70%'
            fill="#8884d8"
            dataKey="value"
            //isAnimationActive
            animationBegin="400"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip/>
          <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" wrapperStyle={style} />

        </PieChart>
      </ResponsiveContainer>
    </>
    );
  }

export default PChart;