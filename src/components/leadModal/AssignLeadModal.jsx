// src/components/AssignLeadModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";

const AssignLeadModal = ({ leads, onClose, assignLeadFunc }) => {
  const [employees, setEmployees] = useState({});
  const { allUsers } = useSelector((state) => state.user);

  const handleAssign = () => {
    const payload = {
      leadIds: leads,
      userId: employees?._id,
    };
    assignLeadFunc(payload);
    onClose();
  };

  const handleSelectEmployee = (event) => {
    const selectedId = event.target.value;
    const selectedEmployee = allUsers?.users?.find((user) => user._id === selectedId) || null;
    setEmployees(selectedEmployee);
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          p: 1,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              backgroundColor: "#eff6ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AssignmentIndOutlinedIcon sx={{ fontSize: 20, color: "#2563eb" }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.05rem", color: "#0f172a", lineHeight: 1.2 }}>
              Assign Selected Leads
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.78rem", mt: 0.25 }}>
              Assign {leads?.length || 0} selected lead(s) to a team member
            </Typography>
          </Box>
        </Stack>
        <IconButton
          aria-label="close"
          onClick={onClose}
          size="small"
          sx={{
            color: "#94a3b8",
            "&:hover": { color: "#0f172a", backgroundColor: "#f1f5f9" },
          }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 2.5, py: 1.5 }}>
        <FormControl variant="outlined" fullWidth size="small" sx={{ mt: 1 }}>
          <InputLabel>Select Team Member</InputLabel>
          <Select
            value={employees?._id || ""}
            onChange={handleSelectEmployee}
            label="Select Team Member"
            MenuProps={{ PaperProps: { sx: { maxHeight: 220, borderRadius: "10px" } } }}
            sx={{ borderRadius: "8px" }}
          >
            <MenuItem value="">
              <em>Select an employee</em>
            </MenuItem>
            {allUsers?.users?.length > 0 ? (
              allUsers.users.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name} ({item.email})
                </MenuItem>
              ))
            ) : null}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions sx={{ px: 2.5, py: 2, borderTop: "1px solid #f1f5f9" }}>
        <Button
          onClick={onClose}
          variant="outlined"
          size="small"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "8px",
            borderColor: "#e2e8f0",
            color: "#64748b",
            px: 2,
            "&:hover": {
              borderColor: "#cbd5e1",
              backgroundColor: "#f8fafc",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleAssign}
          variant="contained"
          size="small"
          disabled={!employees?._id}
          sx={{
            backgroundColor: "#10b981",
            "&:hover": {
              backgroundColor: "#059669",
            },
            px: 2.5,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          }}
        >
          Assign Leads
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignLeadModal;