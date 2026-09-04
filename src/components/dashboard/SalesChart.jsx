import React from 'react';
import { Box, Paper, Typography, Stack } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const profitLossData = [
  { name: 'Profit', value: 4 },
  { name: 'Loss', value: 1 },
];

const COLORS = ['#10b981', '#f43f5e'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const isProfit = data.name === 'Profit';
    return (
      <Box
        sx={{
          backgroundColor: '#0f172a',
          color: '#ffffff',
          px: 1.5,
          py: 1,
          borderRadius: '8px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem', color: isProfit ? '#34d399' : '#f87171' }}>
          {data.name}
        </Typography>
        <Typography variant="caption" sx={{ color: '#cbd5e1', fontSize: '0.75rem' }}>
          Count: <strong>{data.value}</strong> ({((data.value / 5) * 100).toFixed(0)}%)
        </Typography>
      </Box>
    );
  }
  return null;
};

const SalesChart = () => {
  const total = profitLossData.reduce((acc, curr) => acc + curr.value, 0);
  const profitItem = profitLossData.find((d) => d.name === 'Profit');
  const profitRate = total > 0 && profitItem ? ((profitItem.value / total) * 100).toFixed(0) : '0';

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: '14px',
        border: (theme) => `1px solid ${theme.palette.divider}`,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        p: { xs: 1.5, sm: 1.75 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.25s ease',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.925rem', lineHeight: 1.25 }}>
            Profit vs. Loss
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.725rem', mt: 0.25 }}>
            Ratio of closed profitable deals
          </Typography>
        </Box>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            backgroundColor: '#ecfdf5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <PieChartOutlineIcon sx={{ fontSize: 18, color: '#059669' }} />
        </Box>
      </Stack>

      {/* Donut Chart Area */}
      <Box sx={{ position: 'relative', width: '100%', flexGrow: 1, minHeight: 160, maxHeight: 220, height: { xs: 170, sm: 190, md: 'calc(100vh - 390px)' } }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={profitLossData}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={72}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {profitLossData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Donut Label */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', lineHeight: 1, fontSize: '1.25rem' }}>
            {profitRate}%
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.04em' }}>
            PROFIT RATE
          </Typography>
        </Box>
      </Box>

      {/* Custom Legend / Summary */}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2.5}
        sx={{
          pt: 1,
          mt: 0.5,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={0.75}>
          <FiberManualRecordIcon sx={{ fontSize: 10, color: '#10b981' }} />
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.78rem' }}>
            Profit: 4
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.72rem' }}>
            (80%)
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.75}>
          <FiberManualRecordIcon sx={{ fontSize: 10, color: '#f43f5e' }} />
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.78rem' }}>
            Loss: 1
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.72rem' }}>
            (20%)
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default SalesChart;
