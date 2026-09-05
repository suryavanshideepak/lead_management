import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAction, selectAuthState } from '../../app/auth/authSlice';
import { toggleDarkMode, selectDarkMode } from '../../app/theme/themeSlice';
import { persistor } from '../../app/store';
import UiPreferenceModal from '../Modals/UiPreferenceModal';

const Navbar = ({ toggle, title = '' }) => {
  const { isOpen } = useSelector((state) => state.user);
  const { user } = useSelector(selectAuthState);
  const isDarkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [prefModalOpen, setPrefModalOpen] = useState(false);
  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
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

  const initial = user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          position: 'fixed',
          left: isOpen ? '250px' : '56px',
          right: 0,
          width: 'auto',
          transition: 'left 0.3s ease',
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: 'background.paper',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: '48px', sm: '52px' },
            height: { xs: '48px', sm: '52px' },
            px: { xs: 1.5, sm: 2 },
            backgroundColor: 'background.paper',
            color: 'text.primary',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box display="flex" alignItems="center">
            <IconButton edge="start" color="inherit" onClick={toggle} size="small" sx={{ mr: 1.5, p: 0.75 }}>
              <MenuIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ fontWeight: 600, fontSize: '0.95rem', color: 'text.primary' }}>
              {title}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            {/* UI Preference Icon Button */}
            <Tooltip title="UI Preferences (Font & Typography)">
              <IconButton
                onClick={() => setPrefModalOpen(true)}
                size="small"
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : '#f8fafc',
                  color: isDarkMode ? '#cbd5e1' : '#475569',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.09)' : '#f1f5f9',
                    borderColor: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                <TuneOutlinedIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Tooltip>

            {/* Dark Mode Toggle Button */}
            <Tooltip title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
              <IconButton
                onClick={() => dispatch(toggleDarkMode())}
                size="small"
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : '#f8fafc',
                  color: isDarkMode ? '#fbbf24' : '#475569',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.09)' : '#f1f5f9',
                    transform: 'rotate(15deg)',
                  },
                }}
              >
                {isDarkMode ? (
                  <LightModeOutlinedIcon sx={{ fontSize: 17, color: '#fbbf24' }} />
                ) : (
                  <DarkModeOutlinedIcon sx={{ fontSize: 17, color: '#475569' }} />
                )}
              </IconButton>
            </Tooltip>

            {/* User Account Avatar */}
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleMenuOpen}
                size="small"
                sx={{
                  p: 0.25,
                  borderRadius: '50%',
                  border: '1.5px solid transparent',
                  '&:hover': {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                }}
                aria-controls={openMenu ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? 'true' : undefined}
              >
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    backgroundColor: (theme) => theme.palette.primary.main,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#ffffff',
                  }}
                >
                  {initial}
                </Avatar>
              </IconButton>
            </Tooltip>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={openMenu}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                minWidth: 210,
                overflow: 'visible',
                filter: isDarkMode ? 'drop-shadow(0px 8px 24px rgba(0,0,0,0.5))' : 'drop-shadow(0px 8px 16px rgba(0,0,0,0.1))',
                mt: 1.5,
                borderRadius: '12px',
                border: (theme) => `1px solid ${theme.palette.divider}`,
                backgroundColor: 'background.paper',
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                  borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
                  borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box
              onClick={() => {
                handleMenuClose();
                navigate('/profile');
              }}
              sx={{
                px: 2,
                py: 1.5,
                cursor: 'pointer',
                borderRadius: '8px 8px 0 0',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {user?.name || 'User'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                {user?.email || ''}
              </Typography>
              {user?.role && (
                <Chip
                  label={user.role}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    backgroundColor: user.role === 'ADMIN' ? (isDarkMode ? '#3b1c6e' : '#f5f3ff') : (isDarkMode ? '#064e3b' : '#ecfdf5'),
                    color: user.role === 'ADMIN' ? (isDarkMode ? '#c4b5fd' : '#7c3aed') : (isDarkMode ? '#6ee7b7' : '#059669'),
                    border: `1px solid ${user.role === 'ADMIN' ? (isDarkMode ? '#5b21b6' : '#ddd6fe') : (isDarkMode ? '#047857' : '#a7f3d0')}`,
                  }}
                />
              )}
            </Box>

            <Divider sx={{ my: 0.5, borderColor: 'divider' }} />

            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate('/profile');
              }}
              sx={{ py: 1 }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <AccountCircleOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </ListItemIcon>
              <ListItemText
                primary="My Profile"
                primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }}
              />
            </MenuItem>

            <MenuItem
              onClick={() => {
                dispatch(toggleDarkMode());
                handleMenuClose();
              }}
              sx={{ py: 1 }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                {isDarkMode ? (
                  <LightModeOutlinedIcon fontSize="small" sx={{ color: '#fbbf24' }} />
                ) : (
                  <DarkModeOutlinedIcon fontSize="small" sx={{ color: '#64748b' }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }}
              />
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleMenuClose();
                setPrefModalOpen(true);
              }}
              sx={{ py: 1 }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <TuneOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </ListItemIcon>
              <ListItemText
                primary="UI Preferences"
                primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }}
              />
            </MenuItem>

            <Divider sx={{ my: 0.5, borderColor: 'divider' }} />

            <MenuItem onClick={handleLogout} sx={{ color: '#ef4444', py: 1 }}>
              <ListItemIcon sx={{ color: '#ef4444', minWidth: 32 }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 600 }} />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>

    {/* UI Preferences Modal */}
    <UiPreferenceModal
      open={prefModalOpen}
      onClose={() => setPrefModalOpen(false)}
    />
  </>
  );
};

export default Navbar;
