import React, { useEffect, useState } from "react";
import { Box, Grid2, Typography, Stack, Button, Chip } from "@mui/material";
import Layout from "../../components/layout/Layout";
import UserSalesChart from "../../components/dashboard/UserSalesChart";
import SalesChart from "../../components/dashboard/SalesChart";
import DashboardCards from "../../components/dashboard/DashboardCards";
import { useDispatch } from "react-redux";
import { getAllTotalOrders } from "../../app/leads/leadSlice";
import RefreshIcon from '@mui/icons-material/Refresh';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(getAllTotalOrders())
      .unwrap()
      .catch(() => {})
      .finally(() => {
        setTimeout(() => setIsRefreshing(false), 500);
      });
  };

  useEffect(() => {
    dispatch(getAllTotalOrders());
  }, [dispatch]);

  return (
    <Layout title="Dashboard">
      {/* Dashboard Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={1.25}
        sx={{ mb: 1.25 }}
      >
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: 'text.primary',
                letterSpacing: '-0.02em',
                fontSize: { xs: '1.2rem', sm: '1.35rem' },
              }}
            >
              Dashboard Overview
            </Typography>
            <Chip
              size="small"
              icon={<FiberManualRecordIcon sx={{ fontSize: '9px !important', color: '#10b981' }} />}
              label="Live Data"
              sx={{
                backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#064e3b' : '#ecfdf5',
                color: (theme) => theme.palette.mode === 'dark' ? '#6ee7b7' : '#065f46',
                fontWeight: 600,
                fontSize: '0.68rem',
                height: '20px',
                borderRadius: '10px',
                border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? '#047857' : '#a7f3d0'}`,
                '& .MuiChip-label': { px: 0.75 },
              }}
            />
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.78rem', mt: 0.25 }}>
            Real-time summary of verified orders, revenue, and employee performance.
          </Typography>
        </Box>

        {/* Action Controls */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ alignSelf: { xs: 'stretch', sm: 'auto' } }}>
          <Chip
            icon={<CalendarTodayOutlinedIcon sx={{ fontSize: '13px !important', color: 'text.secondary' }} />}
            label="Last 30 Days"
            sx={{
              backgroundColor: 'background.paper',
              border: (theme) => `1px solid ${theme.palette.divider}`,
              color: 'text.primary',
              fontWeight: 500,
              fontSize: '0.75rem',
              height: '32px',
              borderRadius: '8px',
              px: 0.5,
            }}
          />
          <Button
            variant="outlined"
            size="small"
            onClick={handleRefresh}
            disabled={isRefreshing}
            startIcon={
              <RefreshIcon
                sx={{
                  fontSize: '16px !important',
                  animation: isRefreshing ? 'spin 0.8s linear infinite' : 'none',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              />
            }
            sx={{
              height: '32px',
              px: 1.5,
              borderRadius: '8px',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
              color: 'text.primary',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.75rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'action.hover',
              },
            }}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </Stack>
      </Stack>

      {/* Section 1: KPI Metrics */}
      <DashboardCards />

      {/* Section 2: Charts Grid */}
      <Box sx={{ mt: 1.25, flexGrow: 1, minHeight: 0 }}>
        <Grid2 container spacing={1.5}>
          <Grid2 size={{ xs: 12, lg: 7 }}>
            <UserSalesChart />
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 5 }}>
            <SalesChart />
          </Grid2>
        </Grid2>
      </Box>
    </Layout>
  );
};

export default Dashboard;
