import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

const AddUserModal = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      password: formData.password.length < 6,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      setFormData({ name: '', email: '', password: '' });
      onClose();
    }
  };

  const handleModalClose = () => {
    setFormData({ name: '', email: '', password: '' });
    setErrors({ name: false, email: false, password: false });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleModalClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          p: 1,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              backgroundColor: '#ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PersonAddOutlinedIcon sx={{ fontSize: 22, color: '#059669' }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a', lineHeight: 1.2 }}>
              Add New User
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.8rem', mt: 0.25 }}>
              Create an account for a new team member
            </Typography>
          </Box>
        </Stack>
        <IconButton
          aria-label="close"
          onClick={handleModalClose}
          size="small"
          sx={{
            color: '#94a3b8',
            '&:hover': { color: '#0f172a', backgroundColor: '#f1f5f9' },
          }}
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 2.5, py: 1 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            size="small"
            label="Full Name"
            name="name"
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            helperText={errors.name ? 'Name is required' : ''}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />
          <TextField
            fullWidth
            size="small"
            label="Email Address"
            name="email"
            type="email"
            placeholder="e.g. john@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            helperText={errors.email ? 'Please enter a valid email address' : ''}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />
          <TextField
            fullWidth
            size="small"
            label="Password"
            name="password"
            type="password"
            placeholder="Min. 6 characters"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            helperText={errors.password ? 'Password must be at least 6 characters' : ''}
            sx={{
              mb: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 2.5, py: 2, borderTop: '1px solid #f1f5f9' }}>
        <Button
          onClick={handleModalClose}
          variant="outlined"
          size="small"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '8px',
            borderColor: '#e2e8f0',
            color: '#64748b',
            px: 2.5,
            '&:hover': {
              borderColor: '#cbd5e1',
              backgroundColor: '#f8fafc',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleSubmit}
          startIcon={<PersonAddOutlinedIcon sx={{ fontSize: '18px !important' }} />}
          sx={{
            backgroundColor: '#10b981',
            '&:hover': {
              backgroundColor: '#059669',
            },
            px: 2.5,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          }}
        >
          Create User
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserModal;