import React from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";

const Supplier = (props) => {
  const { window } = props;
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Supplier" />
      <Box>
        <Toolbar />
        <Box pt={1}>content here</Box>
      </Box>
    </Box>
  );
};
export default Supplier;
