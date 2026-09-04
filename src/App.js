import React, { useMemo } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Login from './components/Login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import User from './pages/user/User';
import PrivateRoute from './routes/PrivateRoutes';
import Leads from './pages/Leads/Leads';
import EmployeeLeads from './pages/EmployeeLeads/EmployeeLeads';
import Profile from './pages/profile/Profile';
import { useSelector } from 'react-redux';
import { selectAuthState } from './app/auth/authSlice';
import { selectDarkMode } from './app/theme/themeSlice';
import { getAppTheme } from './theme';

function App() {
  const { user } = useSelector(selectAuthState);
  const isDarkMode = useSelector(selectDarkMode);
  const theme = useMemo(() => getAppTheme(isDarkMode ? 'dark' : 'light'), [isDarkMode]);
  const isAdmin = user?.role === 'ADMIN';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute Component={Dashboard} />} />
          <Route
            path="/users"
            element={
              <PrivateRoute
                Component={() => (isAdmin ? <User /> : <Navigate to="/dashboard" replace />)}
              />
            }
          />
          <Route
            path="/leads"
            element={
              <PrivateRoute Component={isAdmin ? Leads : EmployeeLeads} />
            }
          />
          <Route path="/profile" element={<PrivateRoute Component={Profile} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
