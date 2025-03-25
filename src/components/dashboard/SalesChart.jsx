import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const profitLossData = [
  { name: 'Profit', value: 4 }, // 4 months profit
  { name: 'Loss', value: 1 },   // 1 month loss
];

const COLORS = ['#4CAF50', '#F44336'];

const SalesChart = () => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <h3>Company Profit vs. Loss (Last 6 Months)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={profitLossData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {profitLossData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;