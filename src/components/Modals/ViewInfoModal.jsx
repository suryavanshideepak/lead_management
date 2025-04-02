import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { decryptPassword } from '../../utils/helpers';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ViewInfoModal = ({ open, onClose,details }) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          User Info
        </Typography>
        </DialogTitle>
        <DialogContent>
            <Typography color="textSecondary">Email: {details?.email}</Typography>
            <Typography color="textSecondary">Name: {details?.name}</Typography>
            <Typography color="textSecondary">
                Password: {showPassword ? decryptPassword(details?.encryptedPassword) : 'xxxxxxxxxxxxxxxxx' }
                {
                !showPassword ? <IconButton onClick={() => setShowPassword(true)}><VisibilityOffIcon/></IconButton> :
                <IconButton onClick={() => setShowPassword(false)}><VisibilityIcon/></IconButton>
                }              
            </Typography>
        </DialogContent>
    </Dialog>
  );
};

export default ViewInfoModal;