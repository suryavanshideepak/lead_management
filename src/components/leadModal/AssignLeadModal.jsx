// src/components/AssignLeadModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const AssignLeadModal = ({ lead, onClose }) => {
  const [employee, setEmployee] = useState("");

  const handleAssign = () => {
    console.log(`Lead ${lead.name} assigned to ${employee}`);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Assign Lead</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Lead: {lead.name}
        </Typography>
        <TextField
          fullWidth
          label="Employee Name"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAssign} variant="contained">
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignLeadModal;