import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button, MenuItem, Typography } from "@mui/material";
import { useSelector } from "react-redux";


const dispositions = ["New", "Order Placed", "Delivered", "Callback", "Ringing", "Not Connected", "Switch off","Order Verified","Cancel"];

const ViewEditLead = ({ open, onClose, onSubmit, isViewLeadModal, leadDetails }) => {
  const { user } = useSelector((state) => state.auth)
  const isAdmin = user.role === 'ADMIN' 
  const visibleDesposition = isAdmin ? dispositions : dispositions.filter((item, index) => !["Order Verified", "Cancel"].includes(item))
  const [leadData, setLeadData] = useState({
    id:"",
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
    price:'',
    quantity:'',
  });

  const handleChange = (e) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(leadData); 
    onClose(); 
  };

useEffect(() => {
    if (leadDetails) {
      setLeadData({
        id:leadDetails._id || "",
        email: leadDetails.email || "",
        phone: leadDetails.phone || "",
        altPhone: leadDetails.altPhone || "",
        name: leadDetails.name || "",  
        address: leadDetails.address || "",
        city: leadDetails.city || "",
        state: leadDetails.state || "",
        pincode: leadDetails.pincode || "",
        product: leadDetails.product || "",
        desposition: leadDetails.desposition || "New",
        price:leadDetails.price || '2499',
        quantity: leadDetails.quantity || '1'
      });
    }
  }, [leadDetails]);

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="lead-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" id="lead-modal-title" gutterBottom>
          {isViewLeadModal ? 'View Order' : 'Edit Order'}
        </Typography>
        <Box display={'flex'} justifyContent={'space-between'}>
            <TextField disabled={isViewLeadModal} value={leadData.name}  margin="dense" label="Name" name="name" required onChange={handleChange} />
            <TextField disabled={isViewLeadModal} value={leadData.email} margin="dense" label="Email" name="email" onChange={handleChange} />
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
            <TextField disabled={isViewLeadModal} margin="dense" value={leadData.phone} label="Phone" name="phone" onChange={handleChange} />
            <TextField disabled={isViewLeadModal} margin="dense" value={leadData.altPhone} label="Alternate Phone" name="altPhone" onChange={handleChange} />
        </Box>
        
        <TextField disabled={isViewLeadModal} rows={4} fullWidth multiline margin="dense" value={leadData.address} label="Address" name="address" onChange={handleChange} />
        <Box display={'flex'} justifyContent={'space-between'}>
            <TextField disabled={isViewLeadModal} value={leadData.city} margin="dense" label="City" name="city" onChange={handleChange} />
            <TextField disabled={isViewLeadModal} value={leadData.state} margin="dense" label="State" name="state" onChange={handleChange} />
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
            <TextField fullWidth margin="dense" value={leadData.price} label="Price" name="price" onChange={handleChange} />
            <TextField fullWidth margin="dense" value={leadData.quantity} label="Quantity" name="quantity" onChange={handleChange} />
        </Box>
        <TextField disabled={isViewLeadModal} value={leadData.pincode} fullWidth margin="dense" label="Pincode" name="pincode" onChange={handleChange} />
        <TextField disabled={isViewLeadModal} value={leadData.product} fullWidth margin="dense" label="Product" name="product" onChange={handleChange} />

        <TextField
          select
          fullWidth
          margin="dense"
          label="Disposition"
          name="desposition"
          value={leadData.desposition}
          onChange={handleChange}
          disabled={isViewLeadModal}
        >
          {visibleDesposition.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
          {
            !isViewLeadModal ? 
            <Box mt={2} display="flex" justifyContent="space-between">
                <Button onClick={onClose} variant="outlined">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Save Order
                </Button>
            </Box>:''
          }
        
      </Box>
    </Modal>
  );
};

export default ViewEditLead;
