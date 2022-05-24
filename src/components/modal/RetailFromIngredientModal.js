import { Box, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router"
import { useMutation } from "@apollo/client";
import BudaModal from "../../buda-components/modal/BudaModal";
import { NEW_RETAIL_FROM_INGREDIENT_MUTATION } from "../../graphQl/ingredients/ingredientMutation";
import { LOAD_PRODUCTS } from "../../graphQl/products/productQueries";
const RetailFromIngredientModal = ({
        isOpen,
        handleClose,
        id,
        price,
    }) => {
        const [ sku,setSKU ] = useState("");
        const history = useHistory();
        const [ handleRetail ] = useMutation(NEW_RETAIL_FROM_INGREDIENT_MUTATION);
        const isValid = () => {
            return sku.length === 0 ? false : true ; }
        const resetForm = () => {
            setSKU("");
        }
        const handleRetailFromIngredient = (iID,pSKU,iPrice) => {
            handleRetail({
                variables:{
                    ingredientID:parseInt(iID),
                    productSKU: pSKU,
                    price:iPrice
                },
                refetchQueries: [{ query : LOAD_PRODUCTS}]
            })
            .then((res) => {
                handleClose();
                console.log("SUCCESS")
            })
            .then(history.push("/product"))
            .catch((e) => {console.log("FAIL!")})
        }  
        const handleSubmit = () => {
            if( isValid() ) handleRetailFromIngredient(id,sku,price);
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
                            fullWidth
                            multiline
                            rows={3}
                            id="outlined-basic"
                            label="Product SKU"
                            variant="outlined"
                            value={sku}
                            onChange={(e) => {
                            setSKU(e.target.value);
                            }}
                        />
                </Box>
                }
            ></BudaModal>
        )
    }

    export default RetailFromIngredientModal;