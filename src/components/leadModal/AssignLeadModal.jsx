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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";

const AssignLeadModal = ({ leads,onClose,assignLeadFunc }) => {
  const [employees, setEmployees] = useState({});
  const { allUsers } = useSelector((state) => state.user)
  const handleAssign = () => {
    const payload = {
      leadIds:leads,
      userId:employees?._id
    }
    assignLeadFunc(payload)
    onClose();
  };
  const handleSelectEmployee = (event) => {
    const selectedId = event.target.value
    const selectedEmployee = allUsers.users.find((user) => user._id === selectedId) || null
    setEmployees(selectedEmployee)
  }

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" sx={{ "& .MuiDialog-paper": { width:"400px",padding: "20px" } }} >
      <DialogTitle>Assign Lead</DialogTitle>
      <DialogContent >
        <Typography variant="body1" gutterBottom>
        </Typography>
        <FormControl variant="outlined" fullWidth>
        <InputLabel>Employees</InputLabel>
          <Select
            value={employees?._id || ""}
            onChange={handleSelectEmployee}
            fullWidth
            label="Employees"
            size="medium"
            MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
          >
            <MenuItem value="">All</MenuItem> 
            {allUsers?.users?.length > 0 ? allUsers.users.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            )):[]}
          </Select>
       </FormControl>
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