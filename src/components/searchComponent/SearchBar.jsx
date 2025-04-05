import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = debounce((value) => {
    onSearch(value);
  }, 500); // Waits 500ms before triggering API call

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  return (
    <TextField
      label="Search Leads"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={handleChange}
      sx={{ marginBottom: 2 }}
      slotProps={{
        input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
      }}
    />
  );
};

export default SearchBar;
