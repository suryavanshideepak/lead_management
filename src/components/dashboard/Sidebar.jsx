import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, Settings, Logout } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAction } from '../../app/auth/authSlice';
import { useDispatch } from 'react-redux';

const Sidebar = ({ open, toggleDrawer }) => {
  const dispatch = useDispatch()
  const navigate= useNavigate()
  const handleLogout = () => {
    dispatch(logoutAction())
    localStorage.clear()
    navigate('/')
  }
  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer}>
      <List sx={{ width: 250 ,height:'100%',backgroundImage: 'linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)'}}>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon ><Dashboard /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button component={Link} to="/">
          <ListItemIcon onClick={handleLogout}><Logout /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
