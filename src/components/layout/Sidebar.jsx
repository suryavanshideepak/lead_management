import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box } from '@mui/material';
import Dashboard from '@mui/icons-material/Dashboard';
import PersonRounded from '@mui/icons-material/PersonRounded';
import Logout from '@mui/icons-material/Logout';
import Close from '@mui/icons-material/Close';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAction, selectAuthState } from '../../app/auth/authSlice';
import { selectDarkMode } from '../../app/theme/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { persistor } from '../../app/store';
import Logo from '../../assets/logo.webp';

const Sidebar = ({ toggleDrawer }) => {
  const { isOpen } = useSelector((state) => state.user);
  const { user } = useSelector(selectAuthState);
  const isDarkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await persistor.purge();
    } catch (err) {
      console.error('Persistor purge error:', err);
    }
    dispatch(logoutAction());
    localStorage.clear();
    sessionStorage.clear();
    navigate('/', { replace: true });
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
          transition: 'width 0.3s ease, background-color 0.25s ease',
          border: isDarkMode ? '1px solid #1e293b' : '1px solid lightgrey',
          backgroundColor: isDarkMode ? '#0f172a' : '#32de84',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Close Button */}
        {isOpen && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              p: 1,
              borderBottom: isDarkMode ? '1px solid #1e293b' : '1px solid lightgrey',
            }}
          >
            <Box>
              <img src={Logo} alt="logo_image" height={'70px'} />
            </Box>
            <IconButton onClick={toggleDrawer} sx={{ color: '#fff' }}>
              <Close />
            </IconButton>
          </Box>
        )}

        <List>
          <ListItem
            button
            component={Link}
            to="/dashboard"
            sx={{
              borderRadius: '8px',
              mx: 0.5,
              my: 0.25,
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.15)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Dashboard sx={{ color: isDarkMode ? '#34d399' : '#fff' }} />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Dashboard" sx={{ color: '#fff' }} />}
          </ListItem>

          {user?.role === 'ADMIN' ? (
            <ListItem
              button
              component={Link}
              to="/users"
              sx={{
                borderRadius: '8px',
                mx: 0.5,
                my: 0.25,
                '&:hover': {
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.15)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <PersonRounded sx={{ color: isDarkMode ? '#34d399' : '#fff' }} />
              </ListItemIcon>
              {isOpen && <ListItemText primary="Users" sx={{ color: '#fff' }} />}
            </ListItem>
          ) : (
            ''
          )}

          <ListItem
            button
            component={Link}
            to="/leads"
            sx={{
              borderRadius: '8px',
              mx: 0.5,
              my: 0.25,
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.15)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LeaderboardIcon sx={{ color: isDarkMode ? '#34d399' : '#fff' }} />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Leads" sx={{ color: '#fff' }} />}
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/profile"
            sx={{
              borderRadius: '8px',
              mx: 0.5,
              my: 0.25,
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.15)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <AccountCircleOutlinedIcon sx={{ color: isDarkMode ? '#34d399' : '#fff' }} />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Profile" sx={{ color: '#fff' }} />}
          </ListItem>

          <ListItem
            button
            onClick={handleLogout}
            sx={{
              borderRadius: '8px',
              mx: 0.5,
              my: 0.25,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.15)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Logout sx={{ color: isDarkMode ? '#f87171' : '#fff' }} />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Logout" sx={{ color: isDarkMode ? '#f87171' : '#fff' }} />}
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
