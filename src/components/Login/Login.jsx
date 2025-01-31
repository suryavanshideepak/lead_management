// src/pages/LoginPage.js
import React from 'react';
import { Box } from '@mui/material';
import LoginBackground from './LoginBackground';
import LoginPage from './LoginPage';

const Login = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
      }}
    >
      <LoginBackground />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '50%',
          height: '100vh',
        }}
      >
        <LoginPage />
      </Box>
    </Box>
  );
};

export default Login;