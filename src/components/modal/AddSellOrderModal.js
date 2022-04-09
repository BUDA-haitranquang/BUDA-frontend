import { useMutation } from "@apollo/client";
import { Box, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../buda-components/alert/BudaNoti";
import MenuItem from '@mui/material/MenuItem';
import BudaModal from "../../buda-components/modal/BudaModal";
import { ADD_SELL_ORDER_MUTATION } from "../../graphQl/sellOrder/sellOrderMutation";
import { LOAD_SELL_ORDER } from "../../graphQl/sellOrder/sellOrderQueries";
import { reference } from "@popperjs/core";

const AddSellOrderModal = ({ isOpen,handleClose }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [ actualDiscountCash,setActualDiscountCash ] = useState(0);
    const [ actualDiscountPercentage,setActualDiscountPercentage ] = useState(0);
    const [ realCost,setRealCost ] = useState(0);
    const [ finalCost,SetFinalCost ] = useState(0); 
    const [ customerMessage,setCustomerMessage ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);
    const [ newSellOrder, {error} ] = useMutation(ADD_SELL_ORDER_MUTATION);

    const resetForm = () =>{
        setActualDiscountCash(0);
        setActualDiscountPercentage(0);
        setRealCost(0);
        SetFinalCost(0);
        setCustomerMessage("");
    }

    const addSellOrder = () =>{
        setIsLoading(true);
        newSellOrder({
            variables: {
                actualDiscountCash: parseFloat(actualDiscountCash),
                actualDiscountPercentage: parseFloat(actualDiscountPercentage),
                realCost: parseFloat(realCost),
                finalCost: parseFloat(finalCost),
                customerMessage: customerMessage,
            },
            refetchQueries: [{ query: LOAD_SELL_ORDER}],

        })
        .then((res) => {
            handleClose();
            enqueueSnackbar("Add new sell order successfully", AlertSuccessProp);
          })
          .then(resetForm())
          .catch((e) => enqueueSnackbar("An error happened", AlertErrorProp))
          .finally(setIsLoading(false));
    };

    const isFormValid = () => {
        // TODO: check định dạng (price, cost, ... phải là number)
        // + thông báo chi tiết cho từng lỗi, hiện tại đang báo chung lỗi "Invalid input"
        const isValid =
          customerMessage !== "";
        return isValid;
      };

      const handleSubmit = () => {
        if (isFormValid()) addSellOrder();
        else enqueueSnackbar("Invalid input", AlertErrorProp);
      };
      return (
          <BudaModal
            open={isOpen}
            onClose={handleClose}
            textOk="Save"
            onOk={handleSubmit}
            isLoading={isLoading}
            children={
                <Box
                component="form"
                autoComplete="off"
                sx={{
                    width: "480px",
                    "& > :not(style)": { m: 1 },
                }}
                >
                <div
                    style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    }}
                >
                    <TextField
                    required
                    type="number"
                    id="outlined-basic"
                    label="actualDiscountCash"
                    variant="outlined"
                    value={actualDiscountCash}
                    onChange={(e) => setActualDiscountCash(e.target.value)}
                    style={{ width: "48%" }}
                    />
                    <TextField
                    required
                    type="number"
                    id="outlined-basic"
                    label="actualDiscountPercentage"
                    variant="outlined"
                    value={actualDiscountPercentage}
                    onChange={(e) => setActualDiscountPercentage(e.target.value)}
                    style={{ width: "48%" }}
                    />
                </div>

                <div
                    style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "16px",
                    }}
                >
                    <TextField
                    fullWidth
                    required
                    type="number"
                    id="outlined-basic"
                    label="Real Cost"
                    variant="outlined"
                    value={realCost}
                    onChange={(e) => setRealCost(e.target.value)}
                    style={{ width: "48%" }}
                    />
                    <TextField
                    fullWidth
                    required
                    type="number"
                    id="outlined-basic"
                    label="Final Cost"
                    variant="outlined"
                    value={finalCost}
                    onChange={(e) => SetFinalCost(e.target.value)}
                    style={{ width: "48%" }}
                    />
                </div>
              
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={customerMessage}
                    onChange={(e) => setCustomerMessage(e.target.value)}
                />
                </Box>
            }
          ></BudaModal>
      );
};

export default AddSellOrderModal;