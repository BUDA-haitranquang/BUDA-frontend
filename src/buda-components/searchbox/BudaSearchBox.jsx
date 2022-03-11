import React from "react";
import PropTypes from "prop-types";
import { InputAdornment, Paper, TextField } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";

SearchBox.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  query: PropTypes.string,
  removeable: PropTypes.bool,
  autoFocus: PropTypes.bool,
  inputProps: PropTypes.object,
};

function SearchBox(props) {
  const {
    placeholder = "",
    onChange,
    onSubmit,
    query,
    removeable,
    autoFocus,
    inputProps,
  } = props;
  const [value, setValue] = useState(query ? query : "");

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e, e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e, value);
    }
  };

  const handleClear = (e) => {
		setValue("");
    if (onChange) {
      onChange(e, "");
    }
  };

  return (
    <Paper component="form" onSubmit={handleSubmit}>
      <TextField
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        fullWidth
        autoFocus={autoFocus}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ width: "24px", height: "24px" }} />
            </InputAdornment>
          ),
          endAdornment: removeable && value && value.length > 0 && (
            <InputAdornment position="end" onClick={handleClear}>
              <CancelIcon style={{ width: "24px", height: "24px" }} />
            </InputAdornment>
          ),
        }}
        inputProps={inputProps}
        variant="outlined"
      />
    </Paper>
  );
}

export default SearchBox;