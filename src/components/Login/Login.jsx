import React from 'react';
import { Box } from '@mui/material';
import LoginBackground from './LoginBackground'; 
import LoginPage from './LoginPage';
import { useSelector } from 'react-redux';
import ForgotPassword from './ForgotPassword';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { isForgotPass } = useSelector((state) => state.user);
  const { token, user } = useSelector((state) => state.auth);

  // If already authenticated, redirect away from login to dashboard
  if (token && user) {
    return <Navigate to="/dashboard" replace />;
  }

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
        {isForgotPass ? <ForgotPassword /> : <LoginPage />}
      </Box>
    </Box>
  );
};

export default Login;
