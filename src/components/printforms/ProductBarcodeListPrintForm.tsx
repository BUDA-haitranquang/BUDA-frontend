import { Box } from "@mui/material";
import React from "react";
// @ts-ignore
import Barcode from "react-barcode";

interface Props {
  listProduct: any;
}

const ProductBarcodeListPrintForm = React.forwardRef(
  ({ listProduct }: Props, ref) => {
    return (
      <Box ref={ref}>
        {listProduct.map((product: any) => (
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
  }
);

export default ProductBarcodeListPrintForm;
