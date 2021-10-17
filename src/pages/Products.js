import React from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";

const Products = (props) => {
  const { window } = props;
  return (
    <Box>
      <Sidebar window={window} name="Products" />
      <Box>
        <Toolbar />
        <Box pt={1}>content here</Box>
      </Box>
    </Box>
  );
};
export default Products;
