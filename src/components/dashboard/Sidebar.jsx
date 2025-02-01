import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, Settings, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = ({ open, toggleDrawer }) => {
  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer}>
      <List sx={{ width: 250 }}>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon><Dashboard /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button component={Link} to="/">
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
