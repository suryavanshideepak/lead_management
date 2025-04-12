import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Paper, Typography, useTheme } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Sidebar from '../../components/dashboard/Sidebar';
import Navbar from '../../components/nav/Navbar';
import { MaterialReactTable } from 'material-react-table';
import AddUserModal from '../../components/Modals/AddUserModal';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getAllUser, removeUser, sidebarCollapse } from '../../app/users/userSlice';
import Toaster from '../../containers/Toaster';
import ViewInfoModal from '../../components/Modals/ViewInfoModal';

const User = () => {
  const dispatch = useDispatch()
  const { allUsers, isOpen } = useSelector((state) => state.user)
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
  
  const [isRefresh, setIsRefresh] = useState(false)
  const [viewUserDetails, setViewUserDetails] = useState({})
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showViewInfoModal, setShowViewInfoModal] = useState(false);
  const theme = useTheme();

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const toggleDrawer = () => {
    dispatch(sidebarCollapse(!isOpen))
  };

  const handleSaveUser = (newUser) => {
    dispatch(addUser(newUser)).unwrap().then((res)=>{
      setToast({ open: true, message: res.message });
      setIsRefresh(true)
    })
    .catch(err => {
      setToast({ open: true, message: err.message || 'Something went wrong', severity:'error'})
    })
  }

  const handleRemoveUser = (row) => {
    dispatch(removeUser(row._id)).unwrap().then((res)=>{
      setToast({ open: true, message: res.message });
      setIsRefresh(true)
    })
    .catch(err => {
     setToast({ open: true, message: err.message || 'Something went wrong', severity:'error'})
    })
  }

  const handleViewModalInfo =(userInfo)=>{
    setShowViewInfoModal(true)
    setViewUserDetails(userInfo)
  }

  useEffect(() => {
    dispatch(getAllUser())
  },[])

  useEffect(() => {
    if(isRefresh){
      dispatch(getAllUser())
      setIsRefresh(false)
    }   
  },[isRefresh])

  const columns = [
    { 
      accessorKey: "name", 
      header: "Name",
      size: 150,
      Cell: ({ cell }) => (
        <Typography fontWeight="medium">{cell.getValue()}</Typography>
      )
    },
    { 
      accessorKey: "email", 
      header: "Email",
      size: 200,
      Cell: ({ cell }) => (
        <Typography color="textSecondary">{cell.getValue()}</Typography>
      )
    },
    { 
      accessorKey: "status",
      header: "Status",
      size: 100,
      Cell: ({ cell }) => {
        const status = cell.getValue();
        let color;
        switch(status) {
          case 'ACTIVE': color = theme.palette.success.main; break;
          case 'Inactive': color = theme.palette.error.main; break;
          case 'PENDING': color = theme.palette.warning.main; break;
          default: color = theme.palette.text.secondary;
        }
        return (
          <Box
            sx={{
              backgroundColor: `${color}20`,
              color: color,
              borderRadius: '4px',
              padding: '4px 8px',
              display: 'inline-block',
              fontWeight: '500'
            }}
          >
            {status}
          </Box>
        );
      }
    },
  ];



  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar toggleDrawer={toggleDrawer} />
      <Navbar title={'User Management'} toggle={toggleDrawer}/>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          transition: 'width 0.3s ease, margin 0.3s ease',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            backgroundColor: theme.palette.background.paper,
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              User Management
            </Typography>
            <Button 
              variant="contained" 
              onClick={handleAddUser}
              sx={{ 
                backgroundColor: '#32de84',
                '&:hover': {
                  backgroundColor: '#2bc576',
                },
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: '600'
              }}
            >
              Add New User
            </Button>
          </Box>
          
          <MaterialReactTable
            columns={columns}
            data={allUsers?.users?.length ? allUsers.users: []}
            enableRowActions
            positionActionsColumn="last"
            muiTablePaperProps={{
              elevation: 0,
              sx: {
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                overflowY: 'auto',
                overflowX: 'auto'
              }
            }}
            muiTableHeadCellProps={{
              sx: {
                backgroundColor: '#32de84',
                fontWeight: '600',
                color: theme.palette.text.primary,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }
            }}
            muiTableBodyCellProps={{
              sx: {
                borderBottom: `1px solid ${theme.palette.divider}`,
              }
            }}
            muiTableBodyProps={{
              sx: {
                '& tr:nth-of-type(odd)': {
                  backgroundColor: theme.palette.action.hover,
                },
                '& tr:hover': {
                  backgroundColor: theme.palette.action.selected,
                }
              }
            }}
            renderRowActions={({ row }) => (
              <Box>
                <IconButton onClick={() => handleViewModalInfo(row.original)}>
                  <VisibilityOutlinedIcon />
                </IconButton>
                <IconButton onClick={() => handleRemoveUser(row.original)}>
                  <DeleteOutlineOutlinedIcon/>
                </IconButton>
              </Box>
            )}
          />
        </Paper>
        <AddUserModal
          open={showAddUserModal}
          onClose={() => setShowAddUserModal(false)}
          onSave={handleSaveUser}
        />
        <Toaster
          message={toast.message}
          open={toast.open}
          severity={toast.severity}
          onClose={() => setToast({ ...toast, open: false })}
          />
          <ViewInfoModal
            open={showViewInfoModal}
            onClose={() => setShowViewInfoModal(false)}
            details={viewUserDetails}
          />
      </Box>
    </Box>
  );
};

export default User;