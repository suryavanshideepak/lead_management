import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const dispositions = ["New", "Order Placed", "Delivered", "Callback", "Ringing", "Not Connected", "Switch off"];

const DispositionFilter = ({ onFilter }) => {
  const [selectedDisposition, setSelectedDisposition] = useState("");

  const handleChange = (event) => {
    setSelectedDisposition(event.target.value);
    onFilter(event.target.value);
  };

  return (
    <FormControl variant="outlined" fullWidth size="small">
      <InputLabel sx={{ fontSize: '0.85rem' }}>Disposition</InputLabel>
      <Select
        value={selectedDisposition}
        onChange={handleChange}
        label="Disposition"
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 240,
              borderRadius: '10px',
              backgroundColor: 'background.paper',
              border: (theme) => `1px solid ${theme.palette.divider}`,
            },
          },
        }}
        sx={{
          height: '38px',
          borderRadius: '8px',
          fontSize: '0.85rem',
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f8fafc',
          '& fieldset': { borderColor: 'divider' },
          '&:hover fieldset': { borderColor: 'primary.main' },
          '&.Mui-focused fieldset': { borderColor: 'primary.main' },
        }}
      >
        <MenuItem value="">
          <em>All Dispositions</em>
        </MenuItem>
        {dispositions.map((item) => (
          <MenuItem key={item} value={item} sx={{ fontSize: '0.85rem' }}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DispositionFilter;
