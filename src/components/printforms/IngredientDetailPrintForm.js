import React from "react";
import Barcode from "react-barcode";

const IngredientDetailPrintForm = React.forwardRef((props, ref) => {
  const sku = props.sku;
  return (
    <div ref={ref}>
      <Barcode
        marginTop={6}
        width={1}
        height={50}
        fontSize={14}
        value={"IGRE" + sku} // add store identity ?
        text={"INGREDIENT: " + sku}
      />
    </div>
  );
});

export default IngredientDetailPrintForm;
