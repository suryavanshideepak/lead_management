import React, { useState } from "react";
import { Modal, Box, TextField, Button, MenuItem, Typography } from "@mui/material";


const dispositions = ["New", "Order Placed", "Delivered", "Callback", "Ringing", "Not Connected", "Switch off"];

const CreateLeadModal = ({ open, onClose, onSubmit }) => {
  const [leadData, setLeadData] = useState({
    email: "",
    phone: "",
    altPhone: "",
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    product: "",
    desposition: "New",
  });

  const handleChange = (e) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(leadData); 
    onClose(); 
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="lead-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        //   width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" id="lead-modal-title" gutterBottom>
          Create Order
        </Typography>
        <Box display={'flex'} justifyContent={'space-between'}>
            <TextField  margin="dense" label="Name" name="name" required onChange={handleChange} />
            <TextField margin="dense" label="Email" name="email" onChange={handleChange} />
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
            <TextField margin="dense" label="Phone" name="phone" onChange={handleChange} />
            <TextField margin="dense" label="Alternate Phone" name="altPhone" onChange={handleChange} />
        </Box>
        
        <TextField rows={4} fullWidth multiline margin="dense" label="Address" name="address" onChange={handleChange} />
        <Box display={'flex'} justifyContent={'space-between'}>
            <TextField margin="dense" label="City" name="city" onChange={handleChange} />
            <TextField margin="dense" label="State" name="state" onChange={handleChange} />
        </Box>
        <TextField fullWidth margin="dense" label="Pincode" name="pincode" onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Product" name="product" onChange={handleChange} />

        <TextField
          select
          fullWidth
          margin="dense"
          label="Disposition"
          name="desposition"
          value={leadData.desposition}
          onChange={handleChange}
        >
          {dispositions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={onClose} variant="outlined">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Create Order
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateLeadModal;
