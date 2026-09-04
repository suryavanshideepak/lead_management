import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Stack,
  Chip,
  Avatar,
  Tooltip,
  Paper,
} from '@mui/material';
import { decryptPassword } from '../../utils/helpers';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const getAvatarBg = (name) => {
  if (!name) return '#64748b';
  const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const ViewInfoModal = ({ open, onClose, details }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const decryptedPass = details?.encryptedPassword ? decryptPassword(details.encryptedPassword) : null;
  const status = (details?.status || 'ACTIVE').toUpperCase();
  const role = (details?.role || 'EMPLOYEE').toUpperCase();
  const isAdmin = role === 'ADMIN';

  const handleCopy = (text, field) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a' }}>
          User Profile Details
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          size="small"
          sx={{
            color: '#94a3b8',
            '&:hover': { color: '#0f172a', backgroundColor: '#f1f5f9' },
          }}
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 2, py: 1 }}>
        {/* Profile Header Card */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 2.5,
            borderRadius: '12px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              width: 52,
              height: 52,
              fontSize: '1.3rem',
              fontWeight: 700,
              backgroundColor: getAvatarBg(details?.name),
              color: '#ffffff',
            }}
          >
            {details?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
              {details?.name || 'Unnamed User'}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 0.75 }}>
              <Chip
                size="small"
                label={role}
                sx={{
                  backgroundColor: isAdmin ? '#f5f3ff' : '#eff6ff',
                  color: isAdmin ? '#7c3aed' : '#2563eb',
                  border: `1px solid ${isAdmin ? '#ddd6fe' : '#bfdbfe'}`,
                  fontWeight: 600,
                  fontSize: '0.68rem',
                  height: '20px',
                  borderRadius: '5px',
                }}
              />
              <Chip
                size="small"
                icon={<FiberManualRecordIcon sx={{ fontSize: '8px !important', color: status === 'ACTIVE' ? '#10b981 !important' : '#e11d48 !important' }} />}
                label={status}
                sx={{
                  backgroundColor: status === 'ACTIVE' ? '#ecfdf5' : '#fff1f2',
                  color: status === 'ACTIVE' ? '#065f46' : '#9f1239',
                  border: `1px solid ${status === 'ACTIVE' ? '#a7f3d0' : '#fecdd3'}`,
                  fontWeight: 600,
                  fontSize: '0.68rem',
                  height: '20px',
                  borderRadius: '5px',
                  '& .MuiChip-label': { px: 0.75 },
                }}
              />
            </Stack>
          </Box>
        </Paper>

        {/* Details List */}
        <Stack spacing={2}>
          {/* Email Row */}
          <Paper
            elevation={0}
            sx={{
              p: 1.5,
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: '8px',
                  backgroundColor: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MailOutlineIcon sx={{ fontSize: 18, color: '#2563eb' }} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.7rem', display: 'block' }}>
                  EMAIL ADDRESS
                </Typography>
                <Typography variant="body2" sx={{ color: '#0f172a', fontWeight: 500, fontSize: '0.85rem' }}>
                  {details?.email || 'N/A'}
                </Typography>
              </Box>
            </Stack>

            {details?.email && (
              <Tooltip title={copiedField === 'email' ? 'Copied!' : 'Copy Email'}>
                <IconButton
                  size="small"
                  onClick={() => handleCopy(details.email, 'email')}
                  sx={{ color: copiedField === 'email' ? '#10b981' : '#64748b' }}
                >
                  {copiedField === 'email' ? <CheckIcon sx={{ fontSize: 18 }} /> : <ContentCopyIcon sx={{ fontSize: 16 }} />}
                </IconButton>
              </Tooltip>
            )}
          </Paper>

          {/* Password Row */}
          <Paper
            elevation={0}
            sx={{
              p: 1.5,
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: '8px',
                  backgroundColor: '#f5f3ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LockOutlinedIcon sx={{ fontSize: 18, color: '#7c3aed' }} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.7rem', display: 'block' }}>
                  DECRYPTED PASSWORD
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#0f172a',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    fontFamily: showPassword ? 'inherit' : 'monospace',
                    letterSpacing: showPassword ? 'normal' : '0.15em',
                  }}
                >
                  {showPassword ? decryptedPass || 'Unavailable' : '••••••••••••'}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={0.5}>
              <Tooltip title={showPassword ? 'Hide Password' : 'Show Password'}>
                <IconButton size="small" onClick={() => setShowPassword(!showPassword)} sx={{ color: '#64748b' }}>
                  {showPassword ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                </IconButton>
              </Tooltip>
              {decryptedPass && (
                <Tooltip title={copiedField === 'password' ? 'Copied!' : 'Copy Password'}>
                  <IconButton
                    size="small"
                    onClick={() => handleCopy(decryptedPass, 'password')}
                    sx={{ color: copiedField === 'password' ? '#10b981' : '#64748b' }}
                  >
                    {copiedField === 'password' ? <CheckIcon sx={{ fontSize: 18 }} /> : <ContentCopyIcon sx={{ fontSize: 16 }} />}
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Paper>
        </Stack>
      </DialogContent>

      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #f1f5f9', mt: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          size="small"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '8px',
            borderColor: '#e2e8f0',
            color: '#334155',
            px: 2.5,
            '&:hover': {
              borderColor: '#cbd5e1',
              backgroundColor: '#f8fafc',
            },
          }}
        >
          Close
        </Button>
      </Box>
    </Dialog>
  );
};

export default ViewInfoModal;