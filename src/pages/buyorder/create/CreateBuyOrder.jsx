import React, { useState } from "react";
import BoxSupplier from "./components/BoxSupplier/BoxSupplier";
import { Box, Button, Grid, Toolbar } from "@mui/material";
import BoxAdditionalInfo from "./components/BoxAdditionalInfo/BoxAdditionalInfo";
import Sidebar from "../../../components/Sidebar";
import BoxIngredient from "./components/BoxIngredient/BoxIngredient";
import { CreateBuyOrderContext } from "./context/CreateBuyOrderContext";
import { useMutation } from "@apollo/client";
import { NEW_BUY_ORDER } from "../../../graphQl/buyorders/BuyOrderMutations";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { AlertErrorProp } from "../../../buda-components/alert/BudaNoti";
import BoxMoney from "./components/BoxMoney/BoxMoney";

CreateBuyOrder.propTypes = {};

function CreateBuyOrder(props) {
  const { window } = props;
  const [buyOrderRequest, setBuyOrderRequest] = useState({});
  const [newBuyOrder] = useMutation(NEW_BUY_ORDER);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const validateSupplier = () => {
    if (buyOrderRequest.supplier && buyOrderRequest.supplier.supplierID) {
      return true;
    }
    enqueueSnackbar("Please choose a supplier", AlertErrorProp);
    return false;
  };

  const validateBuyOrderItems = () => {
    if (
      buyOrderRequest.buyOrderItemDTOs &&
      buyOrderRequest.buyOrderItemDTOs.length > 0
    ) {
      buyOrderRequest.buyOrderItemDTOs.every((item, index) => {
        if (item.quantity <= 0) {
          enqueueSnackbar(
            "Ingredient number "
              .concat(index.toString())
              .concat(": ")
              .concat("Quantity is less than 0")
          );
          return false;
        }
        if (item.pricePerUnit <= 0) {
          enqueueSnackbar(
            "Ingredient number "
              .concat(index.toString())
              .concat(": ")
              .concat("Price per unit is less than 0")
          );
          return false;
        }
        return true;
      });
      return true;
    }
    enqueueSnackbar("Please choose at least 1 ingredient", AlertErrorProp);
    return false;
  };

  const handleCreateBuyOrder = async () => {
    if (!validateSupplier()) {
      return;
    }
    if (!validateBuyOrderItems()) {
      return;
    }
    try {
      newBuyOrder({
        variables: {
          status: buyOrderRequest.status,
          buyOrderItemDTOs: buyOrderRequest.buyOrderItemDTOs.map((item) => {
            return {
              quantity: item.quantity,
              pricePerUnit: item.pricePerUnit,
              ingredient: {
                ingredientID: item.ingredient.ingredientID,
              },
            };
          }),
          supplierID: buyOrderRequest.supplier.supplierID,
        },
      }).then((result) => {
        history.push(`buy/${result.data.newBuyOrder.buyOrderID}`);
      });
    } catch (e) {
      enqueueSnackbar("An error happened", AlertErrorProp);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Buy Order" id="business"/>

      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Toolbar />
        <Box
          padding={3}
          width="100%"
          bgcolor="#f0f2f5"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <CreateBuyOrderContext.Provider
            value={{ buyOrderRequest, setBuyOrderRequest }}
          >
            <Grid container spacing={3}>
              <Grid item sm={12} md={9}>
                <BoxSupplier />
              </Grid>
              <Grid item sm={12} md={3}>
                <BoxAdditionalInfo />
              </Grid>
              <Grid item xs={12}>
                <BoxIngredient />
              </Grid>
              <Grid item xs={12}>
                <BoxMoney />
              </Grid>
            </Grid>
          </CreateBuyOrderContext.Provider>

          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateBuyOrder}
            style={{ alignSelf: "flex-end" }}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateBuyOrder;
