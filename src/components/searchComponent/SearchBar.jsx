import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = debounce((value) => {
    onSearch(value);
  }, 500); 

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  return (
    <TextField
      label="Search Leads"
      size="small"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={handleChange}
      sx={{
        '& .MuiOutlinedInput-root': {
          height: '38px',
          borderRadius: '8px',
          fontSize: '0.85rem',
          backgroundColor: '#f8fafc',
          '& fieldset': { borderColor: '#e2e8f0' },
          '&:hover fieldset': { borderColor: '#cbd5e1' },
          '&.Mui-focused fieldset': { borderColor: '#10b981' },
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchBar;
