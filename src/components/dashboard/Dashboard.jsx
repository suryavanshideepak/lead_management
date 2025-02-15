import React, { useState } from "react";
import Papa from "papaparse";
import { Button, Container, Typography, Box, AppBar, Toolbar, IconButton, Badge, Avatar } from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import { MaterialReactTable } from "material-react-table";
import AssignLeadModal from "../leadModal/AssignLeadModal";
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from "./Sidebar";
import '../../App.css'

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [open, setOpen] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setLeads(results.data);
      },
    });
  };

  const handleExport = () => {
    const csv = Papa.unparse(leads);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "leads.csv";
    link.click();
  };

  const handleAssignLead = (row) => {
    setSelectedLead(row.original);
    setShowAssignModal(true);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const columns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
  ];

  return (
    <Container>
      <Box sx={{ my: 1,display:'flex' }}>
        <Sidebar open={open} toggleDrawer={toggleDrawer} />
        <AppBar position="fixed">
        <Toolbar sx={{ backgroundColor: "white", color: "black", display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton  color="inherit">
              <Avatar sx={{ width: 28, height: 28 }}>A</Avatar>
            </IconButton>

          </Box>
        </Toolbar>
      </AppBar>
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        <Button variant="contained" onClick={handleExport} sx={{ ml: 2 }}>
          Export Leads
        </Button>
        <MaterialReactTable
          columns={columns}
          data={leads}
          enableRowActions
          renderRowActions={({ row }) => (
            <Button
              variant="contained"
              onClick={() => handleAssignLead(row)}
              sx={{ mr: 1 }}
            >
              Assign
            </Button>
          )}
        />
        {showAssignModal && (
          <AssignLeadModal
            lead={selectedLead}
            onClose={() => setShowAssignModal(false)}
          />
        )}
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;