import React from 'react';
import { Box, Typography } from '@mui/material';

const LoginBackground = ({sx}) => {
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: { xs: '100%', md: '50%' },
        height: '100vh',
        backgroundImage: 'linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontFamily: 'Cursive, Roboto, sans-serif',
          fontWeight: 'bold',
          fontSize: { xs: '2rem', sm: '3rem' }, 
        }}
      >
        Lead Management System
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontFamily: 'Cursive, Roboto, sans-serif',
          fontSize: { xs: '1rem', sm: '1.25rem' }, 
        }}
      >
        Efficiently manage your leads and grow your business.
      </Typography>
    </Box>
  );
};

export default LoginBackground;