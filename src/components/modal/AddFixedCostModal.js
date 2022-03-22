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
import { ADD_FIXED_COST_MUTATION } from "../../graphQl/cost/fixedCost/fixedCostMutation";
import { LOAD_FIXED_COST } from "../../graphQl/cost/fixedCost/fixedCostQueries";

const AddFixedCostModal = ({isOpen,handleClose}) => {
    const { enqueueSnackbar } = useSnackbar();
    const [ name,setName ] = useState("");
    const [ description,setDescription ] = useState("");
    const [ period,setPeriod ] = useState(0);
    const [ moneyAmount,setMoneyAmount ] = useState(0.0);
    const [ newFixedCost,{error} ] = useMutation(ADD_FIXED_COST_MUTATION);
    const [ isLoading,setIsLoading ] = useState(false); 
    const resetForm = () => {
        setName("")
        setDescription("")
        setPeriod(0);
        setMoneyAmount(0.00);
    }
    const addFixedCost = () =>{
        setIsLoading(true)
        newFixedCost({
            variables: {
                name: name,
                description: description,
                period: parseInt(period),
                moneyAmount: parseFloat(moneyAmount),
            },
            refetchQueries: [{ query: LOAD_FIXED_COST }],
        })
        .then((res) =>{
            handleClose();
            enqueueSnackbar("Add successfully",AlertSuccessProp);
        })
        .then(resetForm())
        .catch((e) => enqueueSnackbar("An error happened",AlertErrorProp))
        .finally(setIsLoading(false));
    };
    const isValid = () =>{
        const valid = name!=="" && description !=="";
        return valid;
    }
    const handleSubmit = () => {
        if(isValid()) addFixedCost();
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                            value={moneyAmount}
                            onChange={(e) => setMoneyAmount(e.target.value)}
                            style={{ width: "48%" }}
                        />
                        <TextField
                            required
                            type="number"
                            id="outlined-basic"
                            label="Period"
                            variant="outlined"
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                            style={{ width: "48%" }}
                        />
                    </div>    
                    <TextField
                        required
                        fullWidth
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Box>
            }
        ></BudaModal>
    );
};

export default AddFixedCostModal;