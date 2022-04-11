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

CreateBuyOrder.propTypes = {};

function CreateBuyOrder(props) {
  const { window } = props;
  const [buyOrderRequest, setBuyOrderRequest] = useState(null);
  const [newBuyOrder] = useMutation(NEW_BUY_ORDER);
  const history = useHistory();

  const handleCreateBuyOrder = async () => {
    try {
      newBuyOrder({
        variables: {
          status: "RECEIVING",
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
        history.push(`/buy-order/${result.data.newBuyOrder.buyOrderID}`);
      });
    } catch (e) {}
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Buy Order" />

      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Toolbar />
        <Box padding={3} width="100%" bgcolor="#f0f2f5">
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
            </Grid>
          </CreateBuyOrderContext.Provider>

          <Button
            variant="contained"
            color={"success"}
            onClick={handleCreateBuyOrder}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateBuyOrder;
