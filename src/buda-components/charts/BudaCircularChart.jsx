import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const BudaCircularChart = ({
  title,
  haveValue = true,
  value,
  size,
  thickness,
  color,
  ...props
}) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={parseFloat(value) * 100}
        size={size}
        color={color}
        thickness={thickness}
        style={{
          width: size,
          height: size,
          borderRadius: "100%", 
          // border:'solid',
          boxShadow: "inset 0 0 0px 23px gray",
          backgroundColor: "transparent",
        }}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection:'column'
        }}
      >
        {title && (
          <Typography
            variant="caption"
            component="div"
            fontSize={20}
          >
            {title}
          </Typography>
        )}
        {haveValue && (
          <Typography
            variant="caption"
            component="div"
            fontSize={32}
            sx={{ marginLeft: "25px" }}
          >
            {(100 * parseFloat(value))
              .toString()
              .match(/^-?\d+(?:\.\d{0,2})?/) + "%"}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default BudaCircularChart;
