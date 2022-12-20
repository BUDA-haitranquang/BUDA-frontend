import Box from "@mui/material/Box";
import Revenue from "src/components/statistics/Reveneu";
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
        <Revenue />
      </Box>
    </Box>
  );
};

export default RevenuePage;
