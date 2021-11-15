import React from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import CombinedDetail from "../components/CombinedDetail";

const ProductDetail = (props) => {
  const { window } = props;
  const {data} = props.location.state;
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Product Detail" />
      <Box>
        <Toolbar />
        <Box pt={1}>
            <CombinedDetail data={data}/>
        </Box>
      </Box>
    </Box>
  );
};
export default ProductDetail;