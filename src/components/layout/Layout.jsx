import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { sidebarCollapse } from '../../app/users/userSlice';

const Layout = ({ title = 'Dashboard', children }) => {
  const { isOpen } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    dispatch(sidebarCollapse(!isOpen));
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', maxHeight: '100vh', overflow: 'hidden', backgroundColor: '#f8fafc' }}>
      <Sidebar toggleDrawer={toggleDrawer} />
      <Navbar title={title} toggle={toggleDrawer} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          height: 'calc(100vh - 64px)',
          maxHeight: 'calc(100vh - 64px)',
          mt: '64px',
          px: { xs: 1.5, sm: 2, md: 2.5 },
          py: { xs: 1, sm: 1.25, md: 1.5 },
          boxSizing: 'border-box',
          transition: 'all 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
