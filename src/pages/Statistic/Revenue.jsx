import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Revenue from "src/pages/Statistic/Revenue";
const RevenuePage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Toolbar />
        <Box>{}</Box>

        <Revenue />
      </Box>
    </Box>
  );
};

export default RevenuePage;
