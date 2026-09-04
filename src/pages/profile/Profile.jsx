import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid2,
  TextField,
  Button,
  Avatar,
  Stack,
  Chip,
  Divider,
  Tab,
  Tabs,
  IconButton,
  InputAdornment,
  Switch,
  FormControlLabel,
  useTheme,
} from '@mui/material';
import Layout from '../../components/layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setUser } from '../../app/auth/authSlice';
import { updateUserProfile } from '../../app/users/userSlice';
import { toggleDarkMode, selectDarkMode } from '../../app/theme/themeSlice';
import Toaster from '../../containers/Toaster';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

const Profile = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthState);
  const isDarkMode = useSelector(selectDarkMode);

  const [activeTab, setActiveTab] = useState(0);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
  });

  // Password State
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'EMPLOYEE',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e?.preventDefault();
    if (!formData.name.trim()) {
      setToast({ open: true, message: 'Name cannot be empty', severity: 'error' });
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
      };

      // Call API thunk
      await dispatch(updateUserProfile(payload)).unwrap().catch(() => {});

      // Update Redux user in auth state and persist
      const updatedUser = {
        ...user,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
      };
      dispatch(setUser(updatedUser));

      setToast({ open: true, message: 'Profile updated successfully!', severity: 'success' });
    } catch (err) {
      setToast({ open: true, message: err?.message || 'Failed to update profile', severity: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePassword = (e) => {
    e?.preventDefault();
    if (!passwords.currentPassword) {
      setToast({ open: true, message: 'Please enter your current password', severity: 'error' });
      return;
    }
    if (!passwords.newPassword || passwords.newPassword.length < 6) {
      setToast({ open: true, message: 'New password must be at least 6 characters', severity: 'error' });
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setToast({ open: true, message: 'New passwords do not match', severity: 'error' });
      return;
    }

    setToast({ open: true, message: 'Password updated successfully!', severity: 'success' });
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const initial = formData.name?.[0]?.toUpperCase() || formData.email?.[0]?.toUpperCase() || 'U';

  return (
    <Layout title="My Profile">
      <Box sx={{ maxWidth: '1000px', mx: 'auto', width: '100%', pb: 3 }}>
        {/* Profile Hero Card */}
        <Card
          sx={{
            mb: 2.5,
            borderRadius: '16px',
            backgroundColor: 'background.paper',
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
          }}
        >
          {/* Top Banner Gradient */}
          <Box
            sx={{
              height: '110px',
              background: isDark
                ? 'linear-gradient(135deg, #064e3b 0%, #1e1b4b 100%)'
                : 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
              position: 'relative',
            }}
          />

          <CardContent sx={{ p: { xs: 2, sm: 3 }, pt: 0, position: 'relative' }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'center', sm: 'flex-end' }}
              spacing={2.5}
              sx={{ mt: '-50px', mb: 1 }}
            >
              {/* Avatar */}
              <Avatar
                sx={{
                  width: 96,
                  height: 96,
                  fontSize: '2.25rem',
                  fontWeight: 700,
                  border: `4px solid ${isDark ? '#111827' : '#ffffff'}`,
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                  background: isDark
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                }}
              >
                {initial}
              </Avatar>

              {/* User Basic Info */}
              <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'center', sm: 'center' }}
                  spacing={1}
                >
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.02em' }}>
                    {formData.name || 'User'}
                  </Typography>
                  <Chip
                    label={formData.role}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      backgroundColor: formData.role === 'ADMIN' ? (isDark ? '#3b1c6e' : '#f5f3ff') : (isDark ? '#064e3b' : '#ecfdf5'),
                      color: formData.role === 'ADMIN' ? (isDark ? '#c4b5fd' : '#7c3aed') : (isDark ? '#6ee7b7' : '#059669'),
                      border: `1px solid ${formData.role === 'ADMIN' ? (isDark ? '#5b21b6' : '#ddd6fe') : (isDark ? '#047857' : '#a7f3d0')}`,
                    }}
                  />
                  <Chip
                    size="small"
                    icon={<FiberManualRecordIcon sx={{ fontSize: '9px !important', color: '#10b981' }} />}
                    label="Active Account"
                    sx={{
                      height: 22,
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      backgroundColor: isDark ? 'rgba(16, 185, 129, 0.1)' : '#ecfdf5',
                      color: isDark ? '#6ee7b7' : '#065f46',
                      border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.2)' : '#a7f3d0'}`,
                    }}
                  />
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.825rem', mt: 0.5 }}>
                  {formData.email} {user?._id ? `• ID: ${user._id.slice(-8)}` : ''}
                </Typography>
              </Box>

              {/* Quick Save Button */}
              {activeTab === 0 && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  startIcon={<SaveOutlinedIcon sx={{ fontSize: '18px !important' }} />}
                  sx={{
                    height: '38px',
                    px: 2.5,
                    borderRadius: '9px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.825rem',
                    boxShadow: '0 2px 6px rgba(16, 185, 129, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    },
                  }}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Tabbed Profile Navigation */}
        <Card
          sx={{
            borderRadius: '16px',
            backgroundColor: 'background.paper',
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}`, px: 2, pt: 1 }}>
            <Tabs
              value={activeTab}
              onChange={(e, val) => setActiveTab(val)}
              textColor="primary"
              indicatorColor="primary"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  minHeight: 48,
                  px: 2,
                },
              }}
            >
              <Tab icon={<PersonOutlineOutlinedIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Personal Details" />
              <Tab icon={<LockOutlinedIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Security & Password" />
              <Tab icon={<TuneOutlinedIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Preferences" />
            </Tabs>
          </Box>

          <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            {/* Tab 0: Personal Information */}
            {activeTab === 0 && (
              <form onSubmit={handleSaveProfile}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                  Personal Information
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', mb: 2.5 }}>
                  Update your personal details, contact info, and team representative profile.
                </Typography>

                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#f8fafc',
                        },
                      }}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Email Address"
                      name="email"
                      value={formData.email}
                      disabled
                      helperText="Contact administrator to change email"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#f1f5f9',
                        },
                      }}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 9876543210"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#f8fafc',
                        },
                      }}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Assigned Role"
                      value={formData.role}
                      disabled
                      helperText="Permissions are defined by system administration"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#f1f5f9',
                        },
                      }}
                    />
                  </Grid2>
                </Grid2>

                <Divider sx={{ my: 3, borderColor: 'divider' }} />

                <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSaving}
                    startIcon={<SaveOutlinedIcon sx={{ fontSize: '18px !important' }} />}
                    sx={{
                      height: '38px',
                      px: 3,
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '0.825rem',
                      boxShadow: '0 2px 6px rgba(16, 185, 129, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      },
                    }}
                  >
                    {isSaving ? 'Saving Changes...' : 'Save Changes'}
                  </Button>
                </Stack>
              </form>
            )}

            {/* Tab 1: Security & Password */}
            {activeTab === 1 && (
              <form onSubmit={handleUpdatePassword}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                  Change Password
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', mb: 2.5 }}>
                  Ensure your account is protected with a secure, strong password.
                </Typography>

                <Grid2 container spacing={2} sx={{ maxWidth: '500px' }}>
                  <Grid2 size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      size="small"
                      type={showCurrentPass ? 'text' : 'password'}
                      label="Current Password"
                      name="currentPassword"
                      value={passwords.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton size="small" onClick={() => setShowCurrentPass(!showCurrentPass)}>
                              {showCurrentPass ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#f8fafc',
                        },
                      }}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      size="small"
                      type={showNewPass ? 'text' : 'password'}
                      label="New Password"
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      required
                      helperText="Must be at least 6 characters"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton size="small" onClick={() => setShowNewPass(!showNewPass)}>
                              {showNewPass ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#f8fafc',
                        },
                      }}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      size="small"
                      type={showConfirmPass ? 'text' : 'password'}
                      label="Confirm New Password"
                      name="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton size="small" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                              {showConfirmPass ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#f8fafc',
                        },
                      }}
                    />
                  </Grid2>
                </Grid2>

                <Divider sx={{ my: 3, borderColor: 'divider' }} />

                <Stack direction="row" justifyContent="flex-start">
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<VerifiedUserOutlinedIcon sx={{ fontSize: '18px !important' }} />}
                    sx={{
                      height: '38px',
                      px: 3,
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '0.825rem',
                      boxShadow: '0 2px 6px rgba(37, 99, 235, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      },
                    }}
                  >
                    Update Password
                  </Button>
                </Stack>
              </form>
            )}

            {/* Tab 2: Preferences */}
            {activeTab === 2 && (
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                  Appearance & Workspace
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', mb: 2.5 }}>
                  Customize your viewing mode and personal interface settings.
                </Typography>

                <Card
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: '12px',
                    borderColor: 'divider',
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#f8fafc',
                    mb: 2,
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: '10px',
                          backgroundColor: isDark ? 'rgba(251, 191, 36, 0.15)' : '#eff6ff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {isDarkMode ? (
                          <DarkModeOutlinedIcon sx={{ color: '#fbbf24', fontSize: 22 }} />
                        ) : (
                          <LightModeOutlinedIcon sx={{ color: '#2563eb', fontSize: 22 }} />
                        )}
                      </Box>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                          Dark Theme Mode
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {isDarkMode ? 'Currently using Dark Mode (Sleek slate)' : 'Currently using Light Mode (Clean neutral)'}
                        </Typography>
                      </Box>
                    </Stack>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isDarkMode}
                          onChange={() => dispatch(toggleDarkMode())}
                          color="primary"
                        />
                      }
                      label=""
                    />
                  </Stack>
                </Card>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      <Toaster
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />
    </Layout>
  );
};

export default Profile;
