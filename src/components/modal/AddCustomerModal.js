import { useMutation } from "@apollo/client";
import { Box, TextField } from "@mui/material";
import { parse } from "graphql";
import { add, set } from "lodash";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../buda-components/alert/BudaNoti";
import BudaModal from "../../buda-components/modal/BudaModal";
import { ADD_CUSTOMER_MUTATION } from "../../graphQl/customers/customersMutations"
import { LOAD_CUSTOMERS } from "../../graphQl/customers/customersQueries";

const AddCustomerModal = ({isOpen,handleClose}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [ name,setName ] = useState("");
  const [ phoneNumber,setPhoneNumber] = useState("");;
  const [ address,setAddress ] = useState("");
  const [ totalSpend,setTotalSpend ] = useState(0.0);
  const [ newCustomer,{error} ] = useMutation(ADD_CUSTOMER_MUTATION);
  const [ isLoading,setIsLoading ] = useState(false);
  const resetForm = () => {
    setName("")
    setPhoneNumber("")
    setTotalSpend(0);
    setAddress("");
  } 
  const addCustomer = () =>{
    setIsLoading(true)
    newCustomer({
      variables: {
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        totalSpend: parseFloat(totalSpend),
      },
      refetchQueries: [{ query: LOAD_CUSTOMERS }],
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
    const valid = name!=="" && address !=="";
    return valid;
  }
  const handleSubmit = () => {
      if(isValid()) addCustomer();
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
                        label="totalSpend"
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
                    label="address"
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                 <TextField
                    required
                    fullWidth
                    id="outlined-basic"
                    label="phoneNumber"
                    variant="outlined"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </Box>
        }
    ></BudaModal>
  ); 
}
export default AddCustomerModal;
