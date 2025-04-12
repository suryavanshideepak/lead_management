import { Typography } from '@mui/material';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const profitLossData = [
  { name: 'Profit', value: 4 }, 
  { name: 'Loss', value: 1 },   
];

const COLORS = ['#4CAF50', '#F44336'];

const SalesChart = () => {
  return (
    <div style={{ width: '100%', height: 300 }}> 
      <Typography textAlign={'center'} variant='h5'>Company Profit vs. Loss</Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={profitLossData}
            cx="50%"
            cy="50%"
            outerRadius={80} 
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {profitLossData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
