import { Box } from "@mui/material";
import React from "react";
import Barcode from "react-barcode";

const ProductBarcodeListPrintForm = React.forwardRef(({ listProduct }, ref) => {
  return (
    <Box ref={ref}>
      {listProduct.map((product) => (
        <Barcode
          marginTop={6}
          width={1}
          height={50}
          fontSize={14}
          value={"PROD" + product.sku} // add store identity ?
          text={"PRODUCT: " + product.sku}
        />
      ))}
    </Box>
  );
});

export default ProductBarcodeListPrintForm;
