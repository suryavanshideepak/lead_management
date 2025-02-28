import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box } from '@mui/material';
import { Dashboard, Settings, Logout, Close } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAction } from '../../app/auth/authSlice';
import { useDispatch } from 'react-redux';
import Logo from '../../assets/logo.webp';

const Sidebar = ({ open, toggleDrawer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.clear();
    navigate('/');
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 250 : 56,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 250 : 56,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          border: '1px solid lightgrey',
          backgroundColor:'#32de84'
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Close Button */}
        {open && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom:'1px solid lightgrey' }}>
            <Box>
              <img src={Logo} alt='logo_image' height={'70px'}/>
            </Box>
            <IconButton onClick={toggleDrawer} sx={{ color: '#fff' }}>
              <Close />
            </IconButton>
          </Box>
        )}

        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon><Dashboard sx={{ color: '#fff' }} /></ListItemIcon>
            {open && <ListItemText primary="Dashboard" sx={{ color: '#fff' }} />}
          </ListItem>
          <ListItem button>
            <ListItemIcon><Settings sx={{ color: '#fff' }} /></ListItemIcon>
            {open && <ListItemText primary="Settings" sx={{ color: '#fff' }} />}
          </ListItem>
          <ListItem button component={Link} to="/">
            <ListItemIcon><Logout sx={{ color: '#fff' }} onClick={handleLogout} /></ListItemIcon>
            {open && <ListItemText primary="Logout" sx={{ color: '#fff' }} />}
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;