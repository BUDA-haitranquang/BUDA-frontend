import { useQuery } from "@apollo/client";
import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddProductModal from "../../../../components/modal/AddProductModal";
import { LOAD_PRODUCTS } from "../../../../graphQl/products/productQueries";
import {
  addProductCart,
  clearProductCart,
} from "../../../../redux/productCartSlice";

const useStyle = makeStyles(() => ({
  root: {
    marginBottom: "12px",
    "& .MuiOutlinedInput-input": {
      paddingTop: "10px",
      paddingBottom: "10px",
      color: "black",
    },
  },
}));

export default function SearchProductBar() {
  const classes = useStyle();
  const { error, loading, data } = useQuery(LOAD_PRODUCTS);
  const [products, setProducts] = useState([]);
  const [chosenProductValue, setChosenProductValue] = useState("");
  const [searchProductValue, setSearchProductValue] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      if (data) setProducts(data.productsByUser);
      console.log(data);
    }

    fetchData();
  }, [data]);

  const handleAddProductToList = (value) => {
    console.log(value);
    if(value){
      dispatch(addProductCart(value));
      setChosenProductValue("");
    } 
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  }
  const handleCloseModal = () => {
    setIsOpenModal(false);
  }

  return (
    <Box className={classes.root} display="flex" justifyContent="space-between">
      <Button
        variant="contained"
        color="primary"
        sx={{ width: "15%", padding: "2px"}}
        onClick={handleOpenModal}
      >
        NEW PRODUCT
      </Button>
      <Autocomplete
        id="product-select"
        value={chosenProductValue}
        onChange={(event, value) => handleAddProductToList(value)}
        options={products}
        sx={{ width: "68%" }}
        autoHighlight
        getOptionLabel={(option) => option.name || ""}
        inputValue={searchProductValue}
        onInputChange={(event, newInputValue, reason) => {
          if(reason === "reset") setSearchProductValue("");
          else setSearchProductValue(newInputValue);
        }}
        renderOption={(props, option) => (
          <Box {...props}>
            <Grid container>
              <Grid item xs={8}>
                {option.name}
              </Grid>
              <Grid item xs={2} sx={{ display: "flex" }}>
                <Typography> Left: {option.amountLeft} </Typography>
              </Grid>
              <Grid item xs={2} sx={{ display: "flex" }}>
                <Typography> Price: {option.sellingPrice} </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              label="Search Product"
            ></TextField>
          );
        }}
      />
      <Button
        variant="contained"
        color="error"
        sx={{ width: "15%", padding: "2px"}}
        onClick={() => dispatch(clearProductCart())}
        loadingIndicator="Clearing..."
      >
        CLEAR CART
      </Button>

      <AddProductModal isOpen={isOpenModal} handleClose={handleCloseModal}/>
    </Box>
  );
}
