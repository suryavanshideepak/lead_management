import { Box, Button, Paper, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import Navbar from '../../components/nav/Navbar';
import { MaterialReactTable } from 'material-react-table';
import AddUserModal from '../../components/Modals/AddUserModal';

const User = () => {
  const [leads, setLeads] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-1234', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678', status: 'Inactive' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', phone: '555-9012', status: 'Active' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', phone: '555-3456', status: 'Pending' },
  ]);
  
  const [open, setOpen] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const theme = useTheme();

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleAssignLead = (row) => {
    setSelectedLead(row.original);
    setShowAssignModal(true);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSaveUser = (newUser) => {
    const newUserWithId = {
      ...newUser,
      id: Math.max(...leads.map(user => user.id)) + 1,
      phone: 'N/A',
      status: 'Active'
    };
    setLeads([...leads, newUserWithId]);
  }

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
      accessorKey: "phone", 
      header: "Phone",
      size: 120
    },
    { 
      accessorKey: "status",
      header: "Status",
      size: 100,
      Cell: ({ cell }) => {
        const status = cell.getValue();
        let color;
        switch(status) {
          case 'Active': color = theme.palette.success.main; break;
          case 'Inactive': color = theme.palette.error.main; break;
          case 'Pending': color = theme.palette.warning.main; break;
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
      <Sidebar open={open} toggleDrawer={toggleDrawer} />
      <Navbar open={open} toggle={toggleDrawer}/>
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
            border: `1px solid ${theme.palette.divider}`,
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
            data={leads}
            enableRowActions
            positionActionsColumn="last"
            muiTablePaperProps={{
              elevation: 0,
              sx: {
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                // overflow: 'hidden',
                overflowY: 'auto',
                overflowX: 'auto'
              }
            }}
            muiTableHeadCellProps={{
              sx: {
                backgroundColor: theme.palette.grey[50],
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
              <Button
                variant="outlined"
                onClick={() => handleAssignLead(row)}
                sx={{ 
                  mr: 1,
                  textTransform: 'none',
                  borderRadius: 1,
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: `${theme.palette.primary.main}10`,
                    borderColor: theme.palette.primary.dark,
                  }
                }}
              >
                Assign
              </Button>
            )}
          />
        </Paper>
        <AddUserModal
          open={showAddUserModal}
          onClose={() => setShowAddUserModal(false)}
          onSave={handleSaveUser}
        />
      </Box>
    </Box>
  );
};

export default User;