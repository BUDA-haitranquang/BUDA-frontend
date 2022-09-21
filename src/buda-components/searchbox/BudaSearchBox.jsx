import React from "react";
import PropTypes from "prop-types";
import {
  InputAdornment,
  Paper,
  TextField,
  makeStyles,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  textField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "100px",
      },
      backgroundColor: "transparent",
      boxShadow: "none",
      width: "90%",
      height: "90%",
    },
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
}));

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

  const cls = useStyles();

  return (
    <Paper
      component="form"
      style={{ background: "transparent", boxShadow: "none", height: "100%" }}
      onSubmit={handleSubmit}
    >
      <TextField
        className={cls.textField}
        style={{ borderRadius: "100px" }}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        autoFocus={autoFocus}
        InputProps={{
          padding: "20px",
          color: "primary",
          textAlign: "center",
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ width: "24px", height: "24px" }} />
            </InputAdornment>
          ),
          endAdornment: removeable && value && value.length > 0 && (
            <InputAdornment position="end" onClick={handleClear}>
              <CancelIcon
                style={{ width: "24px", height: "24px", cursor: "pointer" }}
              />
            </InputAdornment>
          ),
        }}
        inputProps={inputProps}
      />
    </Paper>
  );
}

export default SearchBox;
