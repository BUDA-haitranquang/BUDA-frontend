import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import Barcode from "react-barcode";

const ProductDetailPrintForm = React.forwardRef((props, ref) => {
  console.log(props);
  const sku = props.sku;
  return (
    <div ref={ref}>
      <Barcode
        marginTop={6}
        width={1}
        height={50}
        fontSize={14}
        background="#ccffff"
        value={"PROD" + sku} // add store identity ?
        text={"PRODUCT: " + sku}
      />
    </div>
  );
});

export default ProductDetailPrintForm;
