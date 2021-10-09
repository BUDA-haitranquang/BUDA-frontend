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
      <Box width="100%">
        <Toolbar />
        TableName
        <Box display="flex" justifyContent="center">
          <CombinedTable />
        </Box>
      </Box>
    </Box>
  );
};
export default Products;
