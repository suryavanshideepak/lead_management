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
    <FormControl variant="outlined" sx={{ minWidth: 200, marginBottom: 2 }} size="small">
      <InputLabel>Disposition</InputLabel>
      <Select
        value={selectedDisposition}
        onChange={handleChange}
        label="Disposition"
        MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
      >
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
