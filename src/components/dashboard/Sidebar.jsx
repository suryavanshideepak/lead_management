import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box } from '@mui/material';
import { Dashboard, Settings, Logout, Close } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAction } from '../../app/auth/authSlice';
import { useDispatch } from 'react-redux';

const Sidebar = ({ open, toggleDrawer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.clear();
    navigate('/');
  };

  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer}>
      <Box
        sx={{
          width: 250,
          height: '100%',
          backgroundImage: 'linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Close Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={toggleDrawer} sx={{ color: '#fff' }}>
            <Close />
          </IconButton>
        </Box>

        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon><Dashboard sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem button>
            <ListItemIcon><Settings sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Settings" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem button component={Link} to="/">
            <ListItemIcon><Logout sx={{ color: '#fff' }} onClick={handleLogout} /></ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: '#fff' }} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
