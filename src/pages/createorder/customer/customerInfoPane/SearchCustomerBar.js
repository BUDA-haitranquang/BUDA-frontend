import SearchIcon from '@mui/icons-material/Search';
import { FormControl, IconButton, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useState } from "react";

const useStyle = makeStyles(() => ({
  root: {
    marginBottom: "12px",
    "& .MuiOutlinedInput-input": {
      paddingTop: "10px",
      paddingBottom: "10px",
      color: "black"
    },
  },
}));

export default function SearchCustomerBar() {
  const classes = useStyle();
  const [value, setValue] = useState("");
  const handleSearch = () => {};
  return (
    <Box className={classes.root}>
      <FormControl variant="outlined" fullWidth>
        <OutlinedInput
          placeholder="Search Customer"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit" onClick={(e) => handleSearch(value)}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSearch(value);
          }}
        />
      </FormControl>
    </Box>
  );
}
