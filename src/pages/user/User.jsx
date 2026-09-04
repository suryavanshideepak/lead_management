import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Stack,
  Chip,
  Avatar,
  Tooltip,
  Grid2,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  TextField,
  InputAdornment,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Layout from '../../components/layout/Layout';
import { MaterialReactTable } from 'material-react-table';
import AddUserModal from '../../components/Modals/AddUserModal';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getAllUser, removeUser } from '../../app/users/userSlice';
import Toaster from '../../containers/Toaster';
import ViewInfoModal from '../../components/Modals/ViewInfoModal';

// Vibrant avatar gradient generator
const getAvatarGradient = (name) => {
  if (!name) return 'linear-gradient(135deg, #64748b 0%, #475569 100%)';
  const gradients = [
    'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    'linear-gradient(135deg, #10b981 0%, #047857 100%)',
    'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
    'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
    'linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)',
    'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
    'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
};

const User = () => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.user);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewUserDetails, setViewUserDetails] = useState({});
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showViewInfoModal, setShowViewInfoModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, user: null });
  const [selectedTab, setSelectedTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const usersList = useMemo(() => {
    return Array.isArray(allUsers?.users) ? allUsers.users : [];
  }, [allUsers]);

  const activeCount = useMemo(() => {
    return usersList.filter((u) => (u.status || 'ACTIVE').toUpperCase() === 'ACTIVE').length;
  }, [usersList]);

  const inactiveCount = useMemo(() => {
    return usersList.filter((u) => (u.status || '').toUpperCase() !== 'ACTIVE').length;
  }, [usersList]);

  const adminCount = useMemo(() => {
    return usersList.filter((u) => (u.role || '').toUpperCase() === 'ADMIN').length;
  }, [usersList]);

  // Filtered dataset based on tab & local search
  const filteredUsers = useMemo(() => {
    let result = usersList;

    if (selectedTab === 'ACTIVE') {
      result = result.filter((u) => (u.status || 'ACTIVE').toUpperCase() === 'ACTIVE');
    } else if (selectedTab === 'INACTIVE') {
      result = result.filter((u) => (u.status || '').toUpperCase() !== 'ACTIVE');
    } else if (selectedTab === 'ADMIN') {
      result = result.filter((u) => (u.role || '').toUpperCase() === 'ADMIN');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.name?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q) ||
          u.role?.toLowerCase().includes(q) ||
          u.status?.toLowerCase().includes(q) ||
          u._id?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [usersList, selectedTab, searchQuery]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(getAllUser())
      .unwrap()
      .catch(() => {})
      .finally(() => {
        setTimeout(() => setIsRefreshing(false), 500);
      });
  };

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleSaveUser = (newUser) => {
    dispatch(addUser(newUser))
      .unwrap()
      .then((res) => {
        setToast({ open: true, message: res.message || 'User added successfully', severity: 'success' });
        dispatch(getAllUser());
      })
      .catch((err) => {
        setToast({ open: true, message: err.message || 'Something went wrong', severity: 'error' });
      });
  };

  const handleDeleteClick = (user) => {
    setDeleteConfirm({ open: true, user });
  };

  const handleConfirmDelete = () => {
    if (!deleteConfirm.user?._id) return;
    dispatch(removeUser(deleteConfirm.user._id))
      .unwrap()
      .then((res) => {
        setToast({ open: true, message: res.message || 'User removed successfully', severity: 'success' });
        dispatch(getAllUser());
      })
      .catch((err) => {
        setToast({ open: true, message: err.message || 'Something went wrong', severity: 'error' });
      })
      .finally(() => {
        setDeleteConfirm({ open: false, user: null });
      });
  };

  const handleViewModalInfo = (userInfo) => {
    setViewUserDetails(userInfo);
    setShowViewInfoModal(true);
  };

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Team Member',
        size: 260,
        Cell: ({ row }) => {
          const name = row.original.name || 'Unnamed';
          const email = row.original.email || '—';
          return (
            <Stack direction="row" alignItems="center" spacing={1.75} sx={{ py: 0.5 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  background: getAvatarGradient(name),
                  color: '#ffffff',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                  border: '2px solid #ffffff',
                }}
              >
                {name.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  noWrap
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    color: 'text.primary',
                    lineHeight: 1.3,
                  }}
                >
                  {name}
                </Typography>
                <Typography
                  noWrap
                  sx={{
                    fontWeight: 500,
                    fontSize: '0.775rem',
                    color: '#64748b',
                    lineHeight: 1.3,
                    mt: 0.25,
                  }}
                >
                  {email}
                </Typography>
              </Box>
            </Stack>
          );
        },
      },
      {
        accessorKey: '_id',
        header: 'User ID',
        size: 130,
        Cell: ({ cell }) => {
          const id = cell.getValue();
          return (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                px: 1,
                py: 0.35,
                backgroundColor: '#f1f5f9',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                fontFamily: 'monospace',
                fontSize: '0.725rem',
                color: '#475569',
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}
            >
              #{id ? id.slice(-6).toUpperCase() : 'N/A'}
            </Box>
          );
        },
      },
      {
        accessorKey: 'role',
        header: 'Role',
        size: 140,
        Cell: ({ row }) => {
          const role = (row.original?.role || 'EMPLOYEE').toUpperCase();
          const isAdmin = role === 'ADMIN';
          return (
            <Chip
              size="small"
              icon={
                isAdmin ? (
                  <AdminPanelSettingsOutlinedIcon sx={{ fontSize: '14px !important', color: '#7c3aed !important' }} />
                ) : (
                  <BadgeOutlinedIcon sx={{ fontSize: '14px !important', color: '#2563eb !important' }} />
                )
              }
              label={isAdmin ? 'Administrator' : 'Employee'}
              sx={{
                background: isAdmin ? 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)' : 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                color: isAdmin ? '#6d28d9' : '#1d4ed8',
                border: `1px solid ${isAdmin ? '#ddd6fe' : '#bfdbfe'}`,
                fontWeight: 600,
                fontSize: '0.72rem',
                height: '24px',
                borderRadius: '20px',
                px: 0.5,
              }}
            />
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 130,
        Cell: ({ cell }) => {
          const status = (cell.getValue() || 'ACTIVE').toUpperCase();
          let config = {
            bg: '#ecfdf5',
            color: '#065f46',
            border: '#a7f3d0',
            dotColor: '#10b981',
            label: 'Active',
            pulse: true,
          };
          if (status === 'INACTIVE') {
            config = {
              bg: '#fff1f2',
              color: '#9f1239',
              border: '#fecdd3',
              dotColor: '#f43f5e',
              label: 'Inactive',
              pulse: false,
            };
          } else if (status === 'PENDING') {
            config = {
              bg: '#fffbeb',
              color: '#92400e',
              border: '#fde68a',
              dotColor: '#f59e0b',
              label: 'Pending',
              pulse: false,
            };
          }
          return (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                backgroundColor: config.bg,
                color: config.color,
                border: `1px solid ${config.border}`,
                px: 1.25,
                py: 0.35,
                borderRadius: '20px',
                fontSize: '0.725rem',
                fontWeight: 600,
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  backgroundColor: config.dotColor,
                  boxShadow: config.pulse ? `0 0 0 2px ${config.border}` : 'none',
                  animation: config.pulse ? 'pulseRing 2s infinite' : 'none',
                  '@keyframes pulseRing': {
                    '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.4)' },
                    '70%': { transform: 'scale(1)', boxShadow: '0 0 0 4px rgba(16, 185, 129, 0)' },
                    '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)' },
                  },
                }}
              />
              {config.label}
            </Box>
          );
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 110,
        enableSorting: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              p: '2px',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
            }}
          >
            <Tooltip title="View Profile Info" arrow>
              <IconButton
                size="small"
                onClick={() => handleViewModalInfo(row.original)}
                sx={{
                  color: '#64748b',
                  borderRadius: '6px',
                  p: 0.65,
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    color: '#2563eb',
                    backgroundColor: '#eff6ff',
                  },
                }}
              >
                <VisibilityOutlinedIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remove User" arrow>
              <IconButton
                size="small"
                onClick={() => handleDeleteClick(row.original)}
                sx={{
                  color: '#64748b',
                  borderRadius: '6px',
                  p: 0.65,
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    color: '#e11d48',
                    backgroundColor: '#fff1f2',
                  },
                }}
              >
                <DeleteOutlineOutlinedIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    []
  );

  const summaryStats = [
    {
      key: 'ALL',
      title: 'Total Members',
      value: usersList.length,
      icon: <GroupOutlinedIcon sx={{ fontSize: 19, color: '#2563eb' }} />,
      iconBg: '#eff6ff',
      accentColor: '#3b82f6',
    },
    {
      key: 'ACTIVE',
      title: 'Active Accounts',
      value: activeCount,
      icon: <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 19, color: '#059669' }} />,
      iconBg: '#ecfdf5',
      accentColor: '#10b981',
    },
    {
      key: 'INACTIVE',
      title: 'Inactive / Pending',
      value: inactiveCount,
      icon: <WarningAmberOutlinedIcon sx={{ fontSize: 19, color: '#d97706' }} />,
      iconBg: '#fffbeb',
      accentColor: '#f59e0b',
    },
    {
      key: 'ADMIN',
      title: 'Administrators',
      value: adminCount,
      icon: <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 19, color: '#7c3aed' }} />,
      iconBg: '#f5f3ff',
      accentColor: '#8b5cf6',
    },
  ];

  const filterTabs = [
    { key: 'ALL', label: 'All Members', count: usersList.length },
    { key: 'ACTIVE', label: 'Active', count: activeCount },
    { key: 'INACTIVE', label: 'Inactive / Pending', count: inactiveCount },
    { key: 'ADMIN', label: 'Admins', count: adminCount },
  ];

  return (
    <Layout title="User Management">
      {/* Header Section */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={1.5}
        sx={{ mb: 2 }}
      >
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: 'text.primary',
                letterSpacing: '-0.02em',
                fontSize: { xs: '1.25rem', sm: '1.45rem' },
              }}
            >
              User Management
            </Typography>
            <Chip
              size="small"
              icon={<GroupOutlinedIcon sx={{ fontSize: '13px !important', color: '#2563eb' }} />}
              label={`${usersList.length} Total`}
              sx={{
                backgroundColor: '#eff6ff',
                color: '#1d4ed8',
                fontWeight: 600,
                fontSize: '0.72rem',
                height: '22px',
                borderRadius: '10px',
                border: '1px solid #bfdbfe',
              }}
            />
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.825rem', mt: 0.25 }}>
            Manage team members, roles, permissions, and account status in real-time.
          </Typography>
        </Box>

        {/* Action Controls */}
        <Stack direction="row" alignItems="center" spacing={1.25} sx={{ alignSelf: { xs: 'stretch', sm: 'auto' } }}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleRefresh}
            disabled={isRefreshing}
            startIcon={
              <RefreshIcon
                sx={{
                  fontSize: '16px !important',
                  animation: isRefreshing ? 'spin 0.8s linear infinite' : 'none',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              />
            }
            sx={{
              height: '36px',
              px: 1.75,
              borderRadius: '9px',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
              color: 'text.primary',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.8rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'action.hover',
              },
            }}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={handleAddUser}
            startIcon={<PersonAddOutlinedIcon sx={{ fontSize: '18px !important' }} />}
            sx={{
              height: '36px',
              px: 2.25,
              borderRadius: '9px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.8rem',
              boxShadow: '0 2px 4px 0 rgba(16, 185, 129, 0.25)',
              '&:hover': {
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                boxShadow: '0 4px 8px 0 rgba(16, 185, 129, 0.35)',
              },
            }}
          >
            Add New User
          </Button>
        </Stack>
      </Stack>

      {/* Interactive KPI Filter Cards */}
      <Box sx={{ mb: 2 }}>
        <Grid2 container spacing={1.5}>
          {summaryStats.map((stat) => {
            const isSelected = selectedTab === stat.key;
            return (
              <Grid2 key={stat.key} size={{ xs: 12, sm: 6, lg: 3 }}>
                <Card
                  onClick={() => setSelectedTab(stat.key)}
                  sx={{
                    backgroundColor: 'background.paper',
                    borderRadius: '14px',
                    border: (theme) => isSelected ? `2px solid ${stat.accentColor}` : `1px solid ${theme.palette.divider}`,
                    boxShadow: isSelected
                      ? '0 8px 20px -4px rgba(0, 0, 0, 0.1)'
                      : '0 1px 3px 0 rgba(0, 0, 0, 0.04)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease-in-out',
                    transform: isSelected ? 'translateY(-2px)' : 'none',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 20px -4px rgba(0, 0, 0, 0.08)',
                      borderColor: isSelected ? stat.accentColor : '#cbd5e1',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3.5px',
                      backgroundColor: stat.accentColor,
                    },
                  }}
                >
                  <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#64748b',
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            fontSize: '0.675rem',
                            display: 'block',
                          }}
                        >
                          {stat.title}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#0f172a',
                            fontWeight: 800,
                            fontSize: '1.35rem',
                            lineHeight: 1.2,
                            mt: 0.25,
                          }}
                        >
                          {stat.value}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: '10px',
                          backgroundColor: stat.iconBg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {stat.icon}
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid2>
            );
          })}
        </Grid2>
      </Box>

      {/* Modern Card Frame for Table */}
      <Card
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: '16px',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Table Top Action & Filter Toolbar */}
        <Box
          sx={{
            p: { xs: 1.5, sm: 2 },
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', md: 'center' },
            gap: 1.5,
          }}
        >
          {/* Filter Tabs */}
          <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: { xs: 0.5, md: 0 } }}>
            {filterTabs.map((tab) => {
              const isActive = selectedTab === tab.key;
              return (
                <Chip
                  key={tab.key}
                  label={`${tab.label} (${tab.count})`}
                  onClick={() => setSelectedTab(tab.key)}
                  sx={{
                    backgroundColor: (theme) => isActive ? theme.palette.primary.main : theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f8fafc',
                    color: isActive ? '#ffffff' : 'text.secondary',
                    border: (theme) => `1px solid ${isActive ? theme.palette.primary.main : theme.palette.divider}`,
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: '32px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      backgroundColor: (theme) => isActive ? theme.palette.primary.dark : theme.palette.action.hover,
                    },
                  }}
                />
              );
            })}
          </Stack>

          {/* Search Box */}
          <TextField
            size="small"
            placeholder="Search by name, email, role, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchQuery('')} sx={{ p: 0.25 }}>
                    <ClearIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
            sx={{
              minWidth: { xs: '100%', sm: '280px' },
              '& .MuiOutlinedInput-root': {
                height: '36px',
                borderRadius: '8px',
                fontSize: '0.825rem',
                backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f8fafc',
                '& fieldset': { borderColor: 'divider' },
                '&:hover fieldset': { borderColor: 'primary.main' },
                '&.Mui-focused fieldset': { borderColor: '#10b981', borderWidth: '1.5px' },
              },
            }}
          />
        </Box>

        {/* Material React Table */}
        <Box sx={{ width: '100%' }}>
          <MaterialReactTable
            columns={columns}
            data={filteredUsers}
            enableTopToolbar={false}
            enableColumnActions={false}
            enableColumnFilters={false}
            enableDensityToggle={false}
            enableFullScreenToggle={false}
            enableHiding={false}
            enableSorting={true}
            enablePagination={true}
            initialState={{
              density: 'comfortable',
              pagination: { pageSize: 10, pageIndex: 0 },
            }}
            muiTablePaperProps={{
              elevation: 0,
              sx: {
                backgroundColor: 'transparent',
                boxShadow: 'none',
              },
            }}
            muiTableHeadCellProps={{
              sx: {
                backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#0f172a' : '#f8fafc',
                color: 'text.secondary',
                fontWeight: 700,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                py: 1.5,
                borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
              },
            }}
            muiTableBodyCellProps={{
              sx: {
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                color: 'text.primary',
                fontSize: '0.85rem',
                py: 1.25,
              },
            }}
            muiTableBodyProps={{
              sx: {
                '& tr': {
                  transition: 'background-color 0.15s ease-in-out',
                },
                '& tr:hover': {
                  backgroundColor: (theme) => `${theme.palette.action.hover} !important`,
                },
              },
            }}
            muiBottomToolbarProps={{
              sx: {
                backgroundColor: 'background.paper',
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                py: 1,
              },
            }}
            renderEmptyRowsFallback={() => (
              <Box
                sx={{
                  py: 6,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '16px',
                    backgroundColor: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <PersonSearchOutlinedIcon sx={{ fontSize: 28, color: '#94a3b8' }} />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                  No members found
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.825rem', maxWidth: 300, mt: 0.5 }}>
                  No team members matched your filter criteria or search query.
                </Typography>
                {(selectedTab !== 'ALL' || searchQuery) && (
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => {
                      setSelectedTab('ALL');
                      setSearchQuery('');
                    }}
                    sx={{
                      mt: 1.5,
                      textTransform: 'none',
                      fontWeight: 600,
                      color: '#10b981',
                    }}
                  >
                    Reset all filters
                  </Button>
                )}
              </Box>
            )}
          />
        </Box>
      </Card>

      {/* Add User Modal */}
      <AddUserModal
        open={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onSave={handleSaveUser}
      />

      {/* View Info Modal */}
      <ViewInfoModal
        open={showViewInfoModal}
        onClose={() => setShowViewInfoModal(false)}
        details={viewUserDetails}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, user: null })}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            p: 1,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a', pb: 1 }}>
          Delete User
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.875rem' }}>
            Are you sure you want to remove <strong>{deleteConfirm.user?.name || 'this user'}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
          <Button
            onClick={() => setDeleteConfirm({ open: false, user: null })}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: '#64748b',
              borderRadius: '8px',
              px: 2,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '8px',
              px: 2.5,
              backgroundColor: '#e11d48',
              '&:hover': {
                backgroundColor: '#be123c',
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notification */}
      <Toaster
        message={toast.message}
        open={toast.open}
        severity={toast.severity}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </Layout>
  );
};

export default User;