import React, { useContext, useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import LiveSearch from "../../../../../buda-components/livesearch/BudaLiveSearch";
import { useQuery } from "@apollo/client";
import { LOAD_INGREDIENTS } from "../../../../../graphQl/ingredients/ingredientQueries";
import AddIngredientModal from "../../../../../components/modal/AddIngredientModal";
import TableBuyOrderItem from "./TableBuyOrderItems/TableBuyOrderItem";
import useStyles from "./BoxIngredient.styles";
import { CreateBuyOrderContext } from "../../context/CreateBuyOrderContext";
import DefaultImage from "../../../../../buda-components/SVG/DefaultImage";
import { useTranslation } from "react-i18next";

function BoxIngredient(props) {
  const { t } = useTranslation("buyorder", {
    keyPrefix: "create.boxIngredientList",
  });
  const [openCreateIngredient, setOpenCreateIngredient] = useState(false);
  const [buyOrderItems, setBuyOrderItems] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const { data } = useQuery(LOAD_INGREDIENTS);

  const { setBuyOrderRequest } = useContext(CreateBuyOrderContext);

  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      if (data) {
        setIngredients(data.ingredientsByUser);
      }
    }
    fetchData();
  }, [data]);

  const filterIngredient = (filter) => {
    return ingredients.filter((ingredient) => {
      let name = ingredient.name.toLowerCase();
      let sku = ingredient.sku.toLowerCase();
      return (
        name.includes(filter.toLowerCase()) ||
        sku.toLowerCase().includes(filter.toLowerCase())
      );
    });
  };

  const renderRowIngredient = (option) => {
    return (
      option && (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            columnGap={2}
          >
            {option.picture ? (
              <Box
                component="img"
                sx={{
                  height: 64,
                  width: 64,
                }}
                alt={option.name ? option.name : ""}
                src={option.picture.link}
              />
            ) : (
              <DefaultImage style={{ height: "40px", width: "40px" }} />
            )}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              py={1}
            >
              <Typography>{option.name}</Typography>
              <Typography fontWeight="bold">{option.sku}</Typography>
            </Box>
          </Box>

          <Box display="flex">
            <Typography color="#747C87">{t("searchBox.cellIngredient.amountLeft")}: &nbsp; &nbsp;</Typography>
            <Typography>{option.amountLeft}</Typography>
          </Box>
        </Box>
      )
    );
  };

  /// Update context after choosing an ingredient
  useEffect(() => {
    setBuyOrderRequest((prevBuyOrderRequest) => ({
      ...prevBuyOrderRequest,
      buyOrderItemDTOs: buyOrderItems,
    }));
  }, [buyOrderItems]);

  const onChooseIngredient = async (ingredient) => {
    const index = buyOrderItems.findIndex(
      (item) => item.ingredient.ingredientID === ingredient.ingredientID
    );
    if (index < 0) {
      const newItem = {
        ingredient: ingredient,
        quantity: 1,
        pricePerUnit: ingredient.price,
      };
      const newState = [...buyOrderItems];
      newState.push(newItem);
      setBuyOrderItems(newState);
    } else {
      setBuyOrderItems(
        buyOrderItems.map((buyOrderItem) => {
          if (
            buyOrderItem.ingredient.ingredientID === ingredient.ingredientID
          ) {
            buyOrderItem.quantity += 1;
          }
          return buyOrderItem;
        })
      );
    }
  };

  const handleRemoveIngredient = (item) => {
    const index = buyOrderItems.findIndex(
      (buyOrderItem) =>
        buyOrderItem.ingredient.ingredientID === item.ingredient.ingredientID
    );
    if (index < 0) {
      return;
    }
    const newBuyOrderItems = [...buyOrderItems];
    newBuyOrderItems.splice(index, 1);
    setBuyOrderItems(newBuyOrderItems);
  };

  return (
    <Paper className={classes.root}>
      <Box className="BoxIngredient-main">
        <Box className="BoxIngredient-header">
          <Typography variant="h6">{t("title")}</Typography>
          <LiveSearch
            placeholder={t("searchBox.placeholder")}
            createable
            textCreate={t("searchBox.buttonCreate")}
            onClickCreate={() => setOpenCreateIngredient(true)}
            maxHeight={300}
            onChooseItem={onChooseIngredient}
            fetchData={filterIngredient}
            handleRender={renderRowIngredient}
          />
        </Box>

        <TableBuyOrderItem
          buyOrderItems={buyOrderItems}
          onRemoveIngredient={handleRemoveIngredient}
        />

        <AddIngredientModal
          isOpen={openCreateIngredient}
          handleClose={() => setOpenCreateIngredient(false)}
        />
      </Box>
    </Paper>
  );
}

export default BoxIngredient;
