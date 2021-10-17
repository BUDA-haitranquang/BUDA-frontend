import React from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";

import CombinedTable from "../components/CombinedTable";
import { Toolbar } from "@mui/material";

const Products = (props) => {
  const { window } = props;
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Customer" />

      <Box
        mt={5}
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Toolbar />
        <Box>{}</Box>
        <Box width="80%">
          <CombinedTable />
        </Box>
      </Box>
    </Box>
  );
};
export default Products;
