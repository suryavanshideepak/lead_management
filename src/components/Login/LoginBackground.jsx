// src/components/LoginBackground.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const LoginBackground = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '50%',
        height: '100vh',
        backgroundImage: 'linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Lead Management System
      </Typography>
      <Typography variant="subtitle1">
        Efficiently manage your leads and grow your business.
      </Typography>
    </Box>
  );
};

export default LoginBackground;