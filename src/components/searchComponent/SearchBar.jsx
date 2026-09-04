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
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f8fafc',
          '& fieldset': { borderColor: 'divider' },
          '&:hover fieldset': { borderColor: 'primary.main' },
          '&.Mui-focused fieldset': { borderColor: 'primary.main' },
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchBar;
