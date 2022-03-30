import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useRef } from "react";

const SearchFunction = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { onSubmit } = props;
  const navigate = useNavigate();
  const typingTimeoutRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // navigate(`/${page}?search=${searchTerm}`);
    const value = e.target.value;
    setSearchTerm(value);

    if (!onSubmit) return;
  };

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setSearchTerm(e.target.value);
  // };

  const handleSearchTermChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: value,
      };
      onSubmit(formValues);
    }, 300);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignSelf: "center",
        width: "20rem",
        maxWidth: "100%",
        ml: "1rem",
        mr: "5rem",
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          value={searchTerm}
          name="search"
          onChange={handleSearchTermChange}
          placeholder="Search..."
          size="small"
          variant="outlined"
        />
        <IconButton color="primary" aria-label="search" component="span">
          <SearchIcon onClick={handleSubmit} />
        </IconButton>
      </form>
    </Box>
  );
};

export default SearchFunction;
