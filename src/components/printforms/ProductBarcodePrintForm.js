import { Box } from "@mui/material";
import React from "react";
import Barcode from "react-barcode";

const ProductBarcodePrintForm = React.forwardRef((props, ref) => {
  const numCopy = props.numCopy;
  const sku = props.sku;
  return (
    <Box ref={ref}>
      {Array.from({ length: numCopy }, (_, index) => (
        <Barcode
          key={index}
          marginTop={6}
          width={1}
          height={50}
          fontSize={14}
          value={"PROD" + sku} // add store identity ?
          text={"PRODUCT: " + sku}
        />
      ))}
    </Box>
  );
});

export default ProductBarcodePrintForm;
