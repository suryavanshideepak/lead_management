import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box } from '@mui/material';
import { Dashboard,PersonRounded, Settings, Logout, Close } from '@mui/icons-material';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAction, selectAuthState } from '../../app/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../assets/logo.webp';
import { selectUserState } from '../../app/users/userSlice';

const Sidebar = ({ toggleDrawer }) => {
  const { isOpen } = useSelector((state) => state.user)
  const { user } = useSelector(selectAuthState)
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
      open={isOpen}
      sx={{
        width: isOpen ? 250 : 56,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isOpen ? 250 : 56,
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
          overflow:'hidden'
        }}
      >
        {/* Close Button */}
        {isOpen && (
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
            {isOpen && <ListItemText primary="Dashboard" sx={{ color: '#fff' }} />}
          </ListItem>
          {user?.role === 'ADMIN' ?
          <ListItem button component={Link} to="/users">
            <ListItemIcon><PersonRounded sx={{ color: '#fff' }} /></ListItemIcon>
            {isOpen && <ListItemText primary="Users" sx={{ color: '#fff' }} />}
          </ListItem>:''
          }
          
          <ListItem button component={Link} to="/leads">
            <ListItemIcon><LeaderboardIcon sx={{ color: '#fff' }} /></ListItemIcon>
            {isOpen && <ListItemText primary="Leads" sx={{ color: '#fff' }} />}
          </ListItem>
          {/* <ListItem button>
            <ListItemIcon><Settings sx={{ color: '#fff' }} /></ListItemIcon>
            {isOpen && <ListItemText primary="Settings" sx={{ color: '#fff' }} />}
          </ListItem> */}
          <ListItem button component={Link} to="/">
            <ListItemIcon><Logout sx={{ color: '#fff' }} onClick={handleLogout} /></ListItemIcon>
            {isOpen && <ListItemText primary="Logout" sx={{ color: '#fff' }} />}
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;