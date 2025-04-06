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
    <FormControl variant="outlined" sx={{ minWidth: 200, marginBottom: 2 }}>
      <InputLabel>Disposition</InputLabel>
      <Select
        value={selectedDisposition}
        onChange={handleChange}
        label="Disposition"
        size="small"
        MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
      >
        <MenuItem value="">All</MenuItem> 
        {dispositions.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DispositionFilter;
