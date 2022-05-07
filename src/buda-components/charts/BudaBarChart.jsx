import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BudaBarChart=({data,xAxis,width = '100%',height = '100%',legend = true,info,yUnit = '',...props})=> {
    return (
      <ResponsiveContainer width= {width} height={height}>
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
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey={xAxis} />
          <YAxis unit = {yUnit}/>
          <Tooltip />
          {legend && <Legend />}
          {/* <Bar dataKey="pv" fill="#CD201F" name = 'Chi phí'/>
          <Bar dataKey="uv" fill="#82ca9d"name ='Doanh thu' /> */}
          {info.map(item =>
            <Bar dataKey={item.datakey} fill = {item.color} name ={item.name}/>)}
        </BarChart>
      </ResponsiveContainer>
    );
  }

export default BudaBarChart;
