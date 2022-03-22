import { useMutation } from "@apollo/client";
import { Box, TextField } from "@mui/material";
import { parse } from "graphql";
import { set } from "lodash";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../buda-components/alert/BudaNoti";
import BudaModal from "../../buda-components/modal/BudaModal";
import { ADD_FIXED_COST_BILL_MUTATION } from "../../graphQl/cost/fixedCostBill/fixedCostBillMutation";
import { LOAD_FIXED_COST_BILL } from "../../graphQl/cost/fixedCostBill/fixedCostBillQueries";

const AddFixedCostBillModal = ({isOpen,handleClose}) => {
    const { enqueueSnackbar } = useSnackbar();
    const [ message,setMessage ] = useState("");
    const [ creationTime,setCreationTime ] = useState("");
    const [ dueTime,setDueTime ] = useState("");
    const [ totalSpend,setTotalSpend ] = useState(0);
    const [ isLoading,setIsLoading ] = useState(false); 
    const [ newFixedCostBill,setFixedCostBill] = useMutation(ADD_FIXED_COST_BILL_MUTATION);
    const resetForm = () => {
        setMessage("")
        setDueTime("")
        setCreationTime("");
        setTotalSpend(0.00);
    }
    const addFixedCostBill = () =>{
        setIsLoading(true)
        newFixedCostBill({
            variables:{
                message: message,
                dueTime: dueTime,
                creationTime: creationTime,
                totalSpend: totalSpend,
            },
            refetchQueries: [{ query: LOAD_FIXED_COST_BILL }],
        })
        .then((res) => {
            handleClose();
            enqueueSnackbar("Add successfully",AlertSuccessProp);
        })
        .then(resetForm())
        .catch((e) => enqueueSnackbar("An error happened",AlertErrorProp))
        .finally(setIsLoading(false));
    };
    const isValid = () =>{
        const valid = message!=="" && dueTime !=="";
        return valid;
    }
    const handleSubmit = () => {
        if(isValid()) addFixedCostBill();
        else enqueueSnackbar("Invalid input", AlertErrorProp);
    };
    return(
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
                    <TextField
                        required
                        fullWidth
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
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
                            label="moneyAmount"
                            variant="outlined"
                            value={totalSpend}
                            onChange={(e) => setTotalSpend(e.target.value)}
                            style={{ width: "48%" }}
                        />
                    </div>    
                    <TextField
                        required
                        fullWidth
                        id="outlined-basic"
                        label="dueTime"
                        variant="outlined"
                        value={dueTime}
                        onChange={(e) => setDueTime(e.target.value)}
                    />
                    <TextField
                        required
                        fullWidth
                        id="outlined-basic"
                        label="CreationTime"
                        variant="outlined"
                        value={creationTime}
                        onChange={(e) => creationTime(e.target.value)}
                    />
                </Box>
            }
        ></BudaModal>
    );

};

export default AddFixedCostBillModal;