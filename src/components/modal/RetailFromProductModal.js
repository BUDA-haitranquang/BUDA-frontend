import { Box, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import BudaModal from "../../buda-components/modal/BudaModal";
import { AlertErrorProp,AlertSuccessProp } from "../../buda-components/alert/BudaNoti";
import { NEW_RETAL_FROM_PRODUCT_MUTATION } from "../../graphQl/products/productMutations";
import { LOAD_INGREDIENTS } from "../../graphQl/ingredients/ingredientQueries";
import { useHistory } from "react-router"
const RetailFromProductModal = ({ isOpen ,handleClose, data ,title }) => {
    const [ sku,setSKU ] = useState("");
    const [ handleRetail ] = useMutation(NEW_RETAL_FROM_PRODUCT_MUTATION);
    const id = data.productID;
    const history = useHistory();
    const isValid = () => {
        return sku.length === 0 ? false : true ;
    }
    const resetForm = () => {
      setSKU("");
    }
    const handleRetailFromProduct = (pID,iSKU) =>{
        handleRetail({
            variables:{
                productID: parseInt(pID),
                ingredientSKU: iSKU
            },
            refetchQueries: [{ query: LOAD_INGREDIENTS}]
        })
        .then((res) => {
          handleClose();
          console.log("Retail successfully");
        })
        .then(history.push("/ingredient/detail"))
        .then(resetForm())
        .catch((e) => console.log("An error have happened"))
    }
    
    const handleSubmit = () => {
        if ( isValid() ) handleRetailFromProduct(id,sku)
        // console.log(typeof(id))
        // console.log(sku)
        // else enqueueSnackbar("SKU is not valid !!!", AlertErrorProp);
    }
    return (
        <BudaModal
            open = {isOpen}
            onClose = {handleClose}
            textOk = "Retail"
            onOk = {handleSubmit}
            children = {
                <Box
          component="form"
          autoComplete="off"
          sx={{
            width: "480px",
            "& > :not(style)": { m: 1 }
          }}
        >
         
          <TextField
            // required
            fullWidth
            multiline
            rows={3}
            id="outlined-basic"
            label="Ingredient SKU"
            variant="outlined"
            value={sku}
            onChange={(e) => {
              setSKU(e.target.value);
            }}
          />
        </Box>
        }
        >
        </BudaModal>
    )
}

export default RetailFromProductModal;