import React from "react";
import PropTypes from "prop-types";
import { Box, TextField, Typography } from "@mui/material";

BudaTextField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  textFieldHeight: PropTypes.number,
  otherProps: PropTypes.object,
};

function BudaTextField(props) {
  const {
    label,
    placeholder,
    defaultValue,
    value,
    onChange,
    textFieldHeight,
    otherProps,
  } = props;

  return (
    <Box {...otherProps}>
      <Typography mb={1}>{label || ""}</Typography>
      <TextField
        variant="outlined"
        placeholder={placeholder || ""}
        defaultValue={defaultValue || ""}
        value={value}
        fullWidth
        inputProps={{
          style: { height: textFieldHeight ? textFieldHeight : "60px", padding: "0px 14px" },
        }}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  );
}

export default BudaTextField;
