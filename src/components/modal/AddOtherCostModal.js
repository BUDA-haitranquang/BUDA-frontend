import { useMutation } from "@apollo/client";
import { Box, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../buda-components/alert/BudaNoti";
import BudaModal from "../../buda-components/modal/BudaModal";
import { ADD_OTHER_COST } from "../../graphQl/cost/otherCost/otherCostMutation";
import { LOAD_OTHER_COST } from "../../graphQl/cost/otherCost/otherCostQueries";

const AddOtherCostModal = ({isOpen,handleClose}) => {
    const { enqueueSnackbar } = useSnackbar();
    const [ name,setName ] = useState("");
    const [ description,setDescription] = useState("");;
    const [ status,setStatus ] = useState("");
    const [ totalCost,setTotalCost ] = useState(0.0);
    const [ creationTime, setCreationTime] = useState("");
    const [ newOtherCost,{error} ] = useMutation(ADD_OTHER_COST);
    const [ isLoading,setIsLoading ] = useState(false);
    const resetForm = () => {
      setName("")
      setDescription("")
      setTotalCost(0.0);
      setStatus("");
    } 
    const addOtherCost = () =>{
      setIsLoading(true)
      newOtherCost({
        variables: {
          name: name,
          status: status,
          description: description,
          totalCost: parseFloat(totalCost),
        },
        refetchQueries: [{ query: LOAD_OTHER_COST }],
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
      const valid = name!=="";
      return valid;
    }
    const handleSubmit = () => {
        if(isValid()) addOtherCost();
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
                          label="totalCost"
                          variant="outlined"
                          value={totalCost}
                          onChange={(e) => setTotalCost(e.target.value)}
                          style={{ width: "48%" }}
                      />
                  </div>    
                  <TextField
                      required
                      fullWidth
                      id="outlined-basic"
                      label="Status"
                      variant="outlined"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                  />
                  <TextField
                      required
                      fullWidth
                      id="outlined-basic"
                      label="description"
                      variant="outlined"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                  />
              </Box>
          }
      ></BudaModal>
    ); 
  }
  export default AddOtherCostModal;
  