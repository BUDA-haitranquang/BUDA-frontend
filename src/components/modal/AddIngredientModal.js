// import React, { useState } from "react";
// import {
//   Box,
//   Modal,
//   TextField,
//   Typography,
//   IconButton,
//   Button,
// } from "@mui/material";
// import { useSnackbar } from "notistack";
// import BudaModal from "../../buda-components/modal/BudaModal";
// import {
//   AlertErrorProp,
//   AlertSuccessProp,
// } from "../../buda-components/alert/BudaNoti";
// import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// import { useMutation } from "@apollo/client";
// import { ADD_INGREDIENT_MUTATION } from "../../graphQl/ingredients/ingredientMutation";
// import { LOAD_INGREDIENTS } from "../../graphQl/ingredients/ingredientQueries";

// const AddIngredientModal = ({ isOpen, handleClose }) => {
//   const{enqueueSnackbar} = useSnackbar();
  
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState(0);
//   const [amountLeft, setAmountLeft] = useState(0);
//   // const [cost, setCost] = useState(0);
//   const [group, setGroup] = useState("");
//   const [description, setDescription] = useState("");
//   const [newIngredient,{error}] = useMutation(ADD_INGREDIENT_MUTATION);
//   const [isLoading,setIsLoading] = useState(false)
  
//   const resetForm = () =>{
//     setName("");
//     setPrice(0);
//     setAmountLeft(0);
//     setGroup("");
//     setDescription("");
//   }

//   const addIngredient = ()=>{
//     setIsLoading(true)
//     newIngredient({
//       variables:{
//         name: name,
//         description:description,
//         price:parseFloat(price),
//         amountLeft:parseInt(amountLeft)
//       },
//       refetchQueries:[{query: LOAD_INGREDIENTS}]
//     })
//       .then((res) => {
//         handleClose();
//         enqueueSnackbar("Add new ingredient successfully",AlertSuccessProp);
//       })
//       .then(resetForm())
//       .catch((e) => enqueueSnackbar("An error happened",AlertErrorProp))
//       .finally(setIsLoading(false));
//   }

//   const isFormValid = () => {
//     const isValid = (name !== "") 
//                     && (!isNaN(price) && price >= 0)
//                     && (!isNaN(amountLeft) && amountLeft >= 0);
//                     // && (!isNaN(cost) && cost >= 0);
//     return isValid;
//   }

//   const handleSubmit = () => {
//     isFormValid()? addIngredient() : enqueueSnackbar("Invalid input",AlertErrorProp);
//   }



//   return (
//     <BudaModal
//       open={isOpen}
//       onClose={handleClose}
//       textOk = 'Save'
//       onOk = {handleSubmit}
//       isLoading = {isLoading}
//     >
//       <div>
//         <Box
//           component="form"
//           autoComplete="off"
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 500,
//             bgcolor: "background.paper",
//             border: "1px solid #000",
//             boxShadow: 24,
//             p: 5,
//             outline: 0,
//             "& > :not(style)": { m: 1 },
//           }}
//         >
//           <Box
//             display="flex"
//             flexDirection="row"
//             justifyContent="space-between"
//           >
//             <Box mt={1}>
//               <Typography align="center">Add Ingredient</Typography>
//             </Box>

//             {/* <IconButton onClick={handleClose}>
//               <CloseRoundedIcon />
//             </IconButton>
//           </Box>
//           <TextField
//             required
//             fullWidth
//             id="outlined-basic"
//             label="Name"
//             variant="outlined"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
          
//             <TextField
//               required
//               fullWidth
//               type="number"
//               id="outlined-basic"
//               label="Price"
//               variant="outlined"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//             />
            
//           <TextField
//             fullWidth
//             required
//             type="number"
//             id="outlined-basic"
//             label="Amount Left"
//             variant="outlined"
//             value={amountLeft}
//             onChange={(e) => setAmountLeft(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             id="outlined-basic"
//             label="Group"
//             variant="outlined"
//             value={group}
//             onChange={(e) => setGroup(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             id="outlined-basic"
//             label="Description"
//             variant="outlined"
//             multiline
//             rows={3}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </Box>
        
//       </div>
//     </Modal> */}
//   );
// };

// export default AddIngredientModal;
