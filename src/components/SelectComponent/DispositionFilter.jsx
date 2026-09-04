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
        MenuProps={{ PaperProps: { sx: { maxHeight: 240, borderRadius: '10px' } } }}
        sx={{
          height: '38px',
          borderRadius: '8px',
          fontSize: '0.85rem',
          backgroundColor: '#f8fafc',
          '& fieldset': { borderColor: '#e2e8f0' },
          '&:hover fieldset': { borderColor: '#cbd5e1' },
          '&.Mui-focused fieldset': { borderColor: '#10b981' },
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
