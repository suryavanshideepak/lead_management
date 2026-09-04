import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  IconButton,
  Stack,
  Grid2,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

const dispositions = [
  "New",
  "Order Placed",
  "Delivered",
  "Callback",
  "Ringing",
  "Not Connected",
  "Switch off",
  "Order Verified",
  "Cancel",
];

const initialLeadState = {
  email: "",
  phone: "",
  altPhone: "",
  name: "",
  address: "",
  price: "2499",
  quantity: "1",
  city: "",
  state: "",
  pincode: "",
  product: "",
  desposition: "New",
};

const CreateLeadModal = ({ open, onClose, onSubmit }) => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "ADMIN";
  const visibleDesposition = isAdmin
    ? dispositions
    : dispositions.filter((item) => !["Order Verified", "Cancel"].includes(item));

  const [leadData, setLeadData] = useState(initialLeadState);

  useEffect(() => {
    if (open) {
      setLeadData(initialLeadState);
    }
  }, [open]);

  const handleChange = (e) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(leadData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          p: 0.5,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2.5,
          pb: 1.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "10px",
              backgroundColor: "#ecfdf5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AddShoppingCartOutlinedIcon sx={{ fontSize: 22, color: "#059669" }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.05rem", color: "#0f172a", lineHeight: 1.2 }}>
              Create New Order
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.78rem", mt: 0.25 }}>
              Enter customer and order details to record a new lead
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

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ px: 2.5, py: 1.5 }}>
          {/* Customer Details */}
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#94a3b8",
              fontSize: "0.7rem",
              display: "block",
              mb: 1.25,
            }}
          >
            Customer Details
          </Typography>
          <Grid2 container spacing={1.5} sx={{ mb: 2 }}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Full Name"
                name="name"
                value={leadData.name}
                required
                onChange={handleChange}
                placeholder="e.g. Ramesh Kumar"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#f8fafc",
                  },
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Email"
                name="email"
                type="email"
                value={leadData.email}
                onChange={handleChange}
                placeholder="customer@example.com"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#f8fafc",
                  },
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Phone Number"
                name="phone"
                value={leadData.phone}
                onChange={handleChange}
                placeholder="10-digit number"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#f8fafc",
                  },
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Alternate Phone"
                name="altPhone"
                value={leadData.altPhone}
                onChange={handleChange}
                placeholder="Optional backup phone"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#f8fafc",
                  },
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={2}
                label="Delivery Address"
                name="address"
                value={leadData.address}
                onChange={handleChange}
                placeholder="Street address, building, landmark..."
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#f8fafc",
                  },
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                size="small"
                label="City"
                name="city"
                value={leadData.city}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#f8fafc",
                  },
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                size="small"
                label="State"
                name="state"
                value={leadData.state}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#f8fafc",
                  },
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                size="small"
                label="Pincode"
                name="pincode"
                value={leadData.pincode}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#f8fafc",
                  },
                }}
              />
            </Grid2>
          </Grid2>

          <Divider sx={{ my: 2, borderColor: "#f1f5f9" }} />

          {/* Product & Order Details */}
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#94a3b8",
              fontSize: "0.7rem",
              display: "block",
              mb: 1.25,
            }}
          >
            Order & Pricing Details
          </Typography>
          <Grid2 container spacing={1.5}>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                size="small"
                label="Product Name / Code"
                name="product"
                value={leadData.product}
                onChange={handleChange}
                placeholder="e.g. Premium Ayurvedic Kit"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#f8fafc",
                  },
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                size="small"
                label="Price (₹)"
                name="price"
                value={leadData.price}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#f8fafc",
                  },
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                size="small"
                label="Quantity"
                name="quantity"
                value={leadData.quantity}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#f8fafc",
                  },
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                select
                fullWidth
                size="small"
                label="Disposition"
                name="desposition"
                value={leadData.desposition}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#f8fafc",
                  },
                }}
              >
                {visibleDesposition.map((status) => (
                  <MenuItem key={status} value={status} sx={{ fontSize: "0.85rem" }}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
          </Grid2>
        </DialogContent>

        <DialogActions sx={{ px: 2.5, py: 2, borderTop: "1px solid #f1f5f9" }}>
          <Button
            onClick={onClose}
            variant="outlined"
            size="small"
            sx={{
              color: "#64748b",
              borderColor: "#e2e8f0",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.825rem",
              borderRadius: "8px",
              px: 2,
              "&:hover": { borderColor: "#cbd5e1", backgroundColor: "#f8fafc" },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="small"
            sx={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "#ffffff",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.825rem",
              borderRadius: "8px",
              px: 2.5,
              py: 0.75,
              boxShadow: "0 2px 4px 0 rgba(16, 185, 129, 0.25)",
              "&:hover": {
                background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                boxShadow: "0 4px 8px 0 rgba(16, 185, 129, 0.35)",
              },
            }}
          >
            Create Order
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateLeadModal;
