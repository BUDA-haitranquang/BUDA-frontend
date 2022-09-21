import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function BudaCircularChart({
  title,
  haveValue = true,
  value,
  size,
  thickness,
  color,
}) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={parseFloat(value) * 100}
        size={size}
        color={color}
        thickness={thickness}
        sx={{
          width: size,
          height: size,
          borderRadius: "100%",
          boxShadow: "inset 0 0 0px 23px #f0f0f0",
          backgroundColor: "transparent",
        }}
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
          flexDirection: "column",
        }}
      >
        {title && (
          <Typography variant="caption" component="div" fontSize={20}>
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
}
