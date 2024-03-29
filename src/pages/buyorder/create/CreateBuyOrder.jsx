import React, { useState } from "react";
import BoxSupplier from "./components/BoxSupplier/BoxSupplier";
import { Box, Button, Grid } from "@mui/material";
import BoxAdditionalInfo from "./components/BoxAdditionalInfo/BoxAdditionalInfo";
import BoxIngredient from "./components/BoxIngredient/BoxIngredient";
import { CreateBuyOrderContext } from "./context/CreateBuyOrderContext";
import { useMutation } from "@apollo/client";
import { NEW_BUY_ORDER } from "../../../graphQl/buyorders/BuyOrderMutations";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { AlertErrorProp } from "../../../buda-components/alert/BudaNoti";
import BoxMoney from "./components/BoxMoney/BoxMoney";
import { useTranslation } from "react-i18next";

CreateBuyOrder.propTypes = {};

function CreateBuyOrder(props) {
  const { t } = useTranslation("buyorder", { keyPrefix: "create" });
  const [buyOrderRequest, setBuyOrderRequest] = useState({});
  const [newBuyOrder] = useMutation(NEW_BUY_ORDER);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const validateSupplier = () => {
    if (buyOrderRequest.supplier && buyOrderRequest.supplier.supplierID) {
      return true;
    }
    enqueueSnackbar(
      t("error.validateSupplier.supplierNotChosen"),
      AlertErrorProp
    );
    return false;
  };

  const validateBuyOrderItems = () => {
    if (
      buyOrderRequest.buyOrderItemDTOs &&
      buyOrderRequest.buyOrderItemDTOs.length > 0
    ) {
      return buyOrderRequest.buyOrderItemDTOs.every((item, index) => {
        if (item.quantity <= 0) {
          enqueueSnackbar(
            t("error.validateBuyOrderItems.quantityLessThanOrEqualZero", {
              index: (index + 1).toString(),
            }),
            AlertErrorProp
          );
          return false;
        }
        if (item.pricePerUnit <= 0) {
          enqueueSnackbar(
            t("error.validateBuyOrderItems.priceLessThanZero", {
              index: (index + 1).toString(),
            }),
            AlertErrorProp
          );
          return false;
        }
        return true;
      });
    }
    enqueueSnackbar(
      t("error.validateBuyOrderItems.emptyBuyOrder"),
      AlertErrorProp
    );
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
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
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
