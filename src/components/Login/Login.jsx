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
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <LoginBackground />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: { xs: '100%', md: '50%' },
          height: '100vh',
        }}
      >
        <LoginPage />
      </Box>
    </Box>
  );
};

export default Login;
