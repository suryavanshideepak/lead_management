import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'
import { useSelector } from 'react-redux';

const Navbar = ({ toggle, title="" }) => {
    const { isOpen } = useSelector(state => state.user)
    const toggleDrawer = () => {
        toggle()
      };
  return (
    <div>
        <AppBar
        sx={{
        position:"fixed",
          width: isOpen ? `calc(100% - 250px)` : `calc(100% - 56px)`,
          ml: isOpen ? '250px' : '56px',
          transition: 'width 0.3s ease, margin 0.3s ease',
        }}
      >
        <Toolbar sx={{ backgroundColor: "white", color: "black", display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {title}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <IconButton color="inherit">
              {/* <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge> */}
            </IconButton>

            <IconButton color="inherit">
              <Avatar sx={{ width: 28, height: 28 }}>A</Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar