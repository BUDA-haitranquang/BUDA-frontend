import React from "react";
import { Box, Backdrop, LinearProgress, Typography } from "@mui/material";
const FallbackLoading = () => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: "blur(20px)",
      }}
      open={true}
    >
      <Box display="flex" flexDirection="column">
        <Typography sx={{ fontSize: 69 }}>BUDA</Typography>
        <LinearProgress />
      </Box>
    </Backdrop>
  );
};

export default FallbackLoading;
