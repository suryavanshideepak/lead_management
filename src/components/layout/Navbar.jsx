import React from 'react';
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';

const Navbar = ({ toggle, title = '' }) => {
  const { isOpen } = useSelector((state) => state.user);

  return (
    <AppBar
      elevation={0}
      sx={{
        position: 'fixed',
        left: isOpen ? '250px' : '56px',
        right: 0,
        width: 'auto',
        transition: 'left 0.3s ease',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <Toolbar sx={{ backgroundColor: 'white', color: 'black', display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <IconButton edge="start" color="inherit" onClick={toggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ fontWeight: 600, fontSize: '1.05rem', color: '#0f172a' }}>
            {title}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <IconButton color="inherit">
            <Avatar sx={{ width: 32, height: 32, backgroundColor: '#32de84', fontSize: '0.875rem', fontWeight: 600 }}>
              A
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
