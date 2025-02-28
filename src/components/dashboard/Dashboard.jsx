import React, { useState } from "react";
import Papa from "papaparse";
import { Button, Container, Typography, Box, AppBar, Toolbar, IconButton, Badge, Avatar } from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import { MaterialReactTable } from "material-react-table";
import AssignLeadModal from "../leadModal/AssignLeadModal";
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from "./Sidebar";
import '../../App.css';
import Navbar from "../nav/Navbar";

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
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        <Button variant="contained" onClick={handleExport} sx={{ ml: 2, background: 'linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)', }}>
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
  );
};

export default Dashboard;