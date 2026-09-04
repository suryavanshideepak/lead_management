import { Box, Card, CardContent, Grid2, Typography, Stack, Chip } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const formatNumber = (val) => {
  if (val === null || val === undefined) return '0';
  const num = Number(val);
  return isNaN(num) ? val : num.toLocaleString();
};

const formatCurrency = (val) => {
  if (val === null || val === undefined) return '₹0';
  const num = Number(val);
  return isNaN(num) ? `₹${val}` : `₹${num.toLocaleString()}`;
};

const DashboardCards = () => {
  const { totalVarifiedOrder } = useSelector((state) => state.lead);

  const cardsData = [
    {
      id: 'verified-orders',
      title: 'Verified Orders',
      value: formatNumber(totalVarifiedOrder?.totalOrders),
      today: formatNumber(totalVarifiedOrder?.today?.totalOrders),
      icon: <VerifiedOutlinedIcon sx={{ fontSize: 18, color: '#059669' }} />,
      iconBg: '#ecfdf5',
      accentColor: '#10b981',
    },
    {
      id: 'total-revenue',
      title: 'Total Revenue',
      value: formatCurrency(totalVarifiedOrder?.totalPrice),
      today: formatNumber(totalVarifiedOrder?.today?.totalOrders),
      icon: <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 18, color: '#2563eb' }} />,
      iconBg: '#eff6ff',
      accentColor: '#3b82f6',
    },
    {
      id: 'ticket-size',
      title: 'Avg. Ticket Size',
      value: formatCurrency(totalVarifiedOrder?.averageTicketSize),
      today: formatNumber(totalVarifiedOrder?.today?.totalOrders),
      icon: <ReceiptLongOutlinedIcon sx={{ fontSize: 18, color: '#7c3aed' }} />,
      iconBg: '#f5f3ff',
      accentColor: '#8b5cf6',
    },
    {
      id: 'total-orders',
      title: 'Total Orders',
      value: formatNumber(totalVarifiedOrder?.totalOrders),
      today: formatNumber(totalVarifiedOrder?.today?.totalOrders),
      icon: <ShoppingCartOutlinedIcon sx={{ fontSize: 18, color: '#d97706' }} />,
      iconBg: '#fffbeb',
      accentColor: '#f59e0b',
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Grid2 container spacing={1.75}>
        {cardsData.map((card) => (
          <Grid2 key={card.id} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card
              sx={{
                height: '100%',
                backgroundColor: 'background.paper',
                borderRadius: '12px',
                border: (theme) => `1px solid ${theme.palette.divider}`,
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
                transition: 'all 0.2s ease-in-out',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 8px 20px -4px rgba(0, 0, 0, 0.4)' : '0 6px 14px -3px rgba(0, 0, 0, 0.07)',
                  borderColor: 'primary.main',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: card.accentColor,
                  opacity: 0.85,
                },
              }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 600,
                        letterSpacing: '0.03em',
                        textTransform: 'uppercase',
                        fontSize: '0.675rem',
                        display: 'block',
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'text.primary',
                        fontWeight: 700,
                        fontSize: { xs: '1.25rem', sm: '1.4rem' },
                        lineHeight: 1.2,
                        mt: 0.25,
                      }}
                    >
                      {card.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : card.iconBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {card.icon}
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    pt: 1,
                    mt: 1,
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Chip
                    size="small"
                    icon={<TrendingUpIcon sx={{ fontSize: '12px !important', color: '#10b981' }} />}
                    label={`Today: ${card.today}`}
                    sx={{
                      backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9',
                      color: 'text.primary',
                      fontWeight: 600,
                      fontSize: '0.68rem',
                      height: '20px',
                      borderRadius: '5px',
                      '& .MuiChip-label': { px: 0.75 },
                    }}
                  />
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.675rem', fontWeight: 500 }}>
                    Last 30 Days
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default DashboardCards;