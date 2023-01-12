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
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddProductModal from "../../../../components/modal/AddProductModal";
import { LOAD_PRODUCTS } from "../../../../graphQl/products/productQueries";
import {
  addProductCart,
  clearProductCart,
} from "../../../../redux/productCartSlice";
import { useTranslation } from "react-i18next";
import color from "src/theme/color";

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
  const { t } = useTranslation(["sell"]);
  useEffect(() => {
    async function fetchData() {
      if (data) setProducts(data.productsByUser);
    }

    fetchData();
  }, [data]);

  const handleAddProductToList = (value) => {
    console.log(value);
    if (value) {
      dispatch(addProductCart(value));
      setChosenProductValue("");
    }
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <Box className={classes.root} display="flex" justifyContent="space-between">
      <Button
        variant="contained"
        sx={{
          width: "15%",
          padding: "2px",
          backgroundColor: color.PRIMARY,
          "&:hover": {
            backgroundColor: color.PRIMARY,
          },
          boxShadow: "none",
        }}
        onClick={handleOpenModal}
      >
        <Typography fontFamily="'Andika', san serif">
          {t("sell:newProduct")}
        </Typography>
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
          if (reason === "reset") setSearchProductValue("");
          else setSearchProductValue(newInputValue);
        }}
        renderOption={(props, option) => (
          <Box {...props} key={option.productID}>
            <Grid container>
              <Grid item xs={8}>
                {option.name}
              </Grid>
              <Grid item xs={2} sx={{ display: "flex" }}>
                <Typography>
                  {" "}
                  {t("sell:left")}: {option.amountLeft}{" "}
                </Typography>
              </Grid>
              <Grid item xs={2} sx={{ display: "flex" }}>
                <Typography>
                  {" "}
                  {t("sell:price")}: {option.sellingPrice}{" "}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
        renderInput={(params) => {
          return <TextField {...params} label={t("sell:searchProduct")} />;
        }}
      />
      <Button
        variant="contained"
        sx={{
          width: "15%",
          padding: "2px",
          backgroundColor: color.LIGHT_RED,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: color.LIGHT_RED,
          },
        }}
        onClick={() => dispatch(clearProductCart())}
        loadingIndicator="Clearing..."
      >
        <Typography fontFamily="'Andika', san serif">
          {t("sell:clearCart")}
        </Typography>
      </Button>

      <AddProductModal isOpen={isOpenModal} handleClose={handleCloseModal} />
    </Box>
  );
}
