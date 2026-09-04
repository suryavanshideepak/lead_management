import React, { useEffect, useState } from "react";
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
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

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

const ViewEditLead = ({ open, onClose, onSubmit, isViewLeadModal, leadDetails }) => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "ADMIN";
  const visibleDesposition = isAdmin
    ? dispositions
    : dispositions.filter((item) => !["Order Verified", "Cancel"].includes(item));

  const [leadData, setLeadData] = useState({
    id: "",
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
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(leadData);
    onClose();
  };

  useEffect(() => {
    if (leadDetails) {
      setLeadData({
        id: leadDetails._id || "",
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
        price: leadDetails.price || "2499",
        quantity: leadDetails.quantity || "1",
      });
    }
  }, [leadDetails]);

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
              backgroundColor: isViewLeadModal ? "#eff6ff" : "#ecfdf5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isViewLeadModal ? (
              <VisibilityOutlinedIcon sx={{ fontSize: 22, color: "#2563eb" }} />
            ) : (
              <EditNoteOutlinedIcon sx={{ fontSize: 24, color: "#059669" }} />
            )}
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.05rem", color: "#0f172a", lineHeight: 1.2 }}>
              {isViewLeadModal ? "Lead Details" : "Edit Order / Lead"}
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.78rem", mt: 0.25 }}>
              {isViewLeadModal
                ? "Full customer and order specifications"
                : "Update lead status, customer information, or order pricing"}
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
                disabled={isViewLeadModal}
                label="Full Name"
                name="name"
                value={leadData.name}
                required
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: isViewLeadModal ? "#f1f5f9" : "#f8fafc",
                  },
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                disabled={isViewLeadModal}
                label="Email"
                name="email"
                type="email"
                value={leadData.email}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: isViewLeadModal ? "#f1f5f9" : "#f8fafc",
                  },
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                disabled={isViewLeadModal}
                label="Phone Number"
                name="phone"
                value={leadData.phone}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: isViewLeadModal ? "#f1f5f9" : "#f8fafc",
                  },
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                disabled={isViewLeadModal}
                label="Alternate Phone"
                name="altPhone"
                value={leadData.altPhone}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: isViewLeadModal ? "#f1f5f9" : "#f8fafc",
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
                disabled={isViewLeadModal}
                label="Delivery Address"
                name="address"
                value={leadData.address}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: isViewLeadModal ? "#f1f5f9" : "#f8fafc",
                  },
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                size="small"
                disabled={isViewLeadModal}
                label="City"
                name="city"
                value={leadData.city}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: isViewLeadModal ? "#f1f5f9" : "#f8fafc",
                  },
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                size="small"
                disabled={isViewLeadModal}
                label="State"
                name="state"
                value={leadData.state}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: isViewLeadModal ? "#f1f5f9" : "#f8fafc",
                  },
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                size="small"
                disabled={isViewLeadModal}
                label="Pincode"
                name="pincode"
                value={leadData.pincode}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: isViewLeadModal ? "#f1f5f9" : "#f8fafc",
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
                disabled={isViewLeadModal}
                label="Product Name / Code"
                name="product"
                value={leadData.product}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: isViewLeadModal ? "#f1f5f9" : "#f8fafc",
                  },
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                size="small"
                disabled={isViewLeadModal}
                label="Price (₹)"
                name="price"
                value={leadData.price}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: isViewLeadModal ? "#f1f5f9" : "#f8fafc",
                  },
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                size="small"
                disabled={isViewLeadModal}
                label="Quantity"
                name="quantity"
                value={leadData.quantity}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: isViewLeadModal ? "#f1f5f9" : "#f8fafc",
                  },
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                select
                fullWidth
                size="small"
                disabled={isViewLeadModal}
                label="Disposition"
                name="desposition"
                value={leadData.desposition}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: isViewLeadModal ? "#f1f5f9" : "#f8fafc",
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
          {isViewLeadModal ? (
            <Button
              onClick={onClose}
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "#f1f5f9",
                color: "#334155",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.825rem",
                borderRadius: "8px",
                px: 2.5,
                boxShadow: "none",
                "&:hover": { backgroundColor: "#e2e8f0", boxShadow: "none" },
              }}
            >
              Close
            </Button>
          ) : (
            <>
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
                Save Order
              </Button>
            </>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ViewEditLead;
