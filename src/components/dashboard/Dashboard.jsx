import React, { useState } from "react";
import Papa from "papaparse";
import { Button, Container, Typography, Box } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import AssignLeadModal from "../leadModal/AssignLeadModal";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
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

  const columns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
  ];

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
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
    </Container>
  );
};

export default Dashboard;