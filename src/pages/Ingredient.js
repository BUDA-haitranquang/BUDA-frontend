import { useMutation, useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../buda-components/alert/BudaNoti";
import BudaTable from "../buda-components/table/BudaTable";
import AddIngredientModal from "../components/modal/AddIngredientModal";
import IngredientTableBody from "../components/table/body/IngredientTableBody";
import { HIDE_INGREDIENT_MUTATION } from "../graphQl/ingredients/ingredientMutation";
import { LOAD_INGREDIENTS } from "../graphQl/ingredients/ingredientQueries";

const Ingredient = (props) => {
  const [ingredients, setIngredients] = useState([]);
  const { error, loading, data } = useQuery(LOAD_INGREDIENTS);
  const [hideIngredient] = useMutation(HIDE_INGREDIENT_MUTATION);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(["common", "ingredient"]);
  const handleDelete = (selected) => {
    if (selected === []) return;
    setIsLoading(true);
    try {
      selected.forEach((item) => {
        hideIngredient({
          variables: { ingredientID: parseInt(item) },
          refetchQueries: [{ query: LOAD_INGREDIENTS }],
        });
      });
      enqueueSnackbar("Delete item(s) successfully", AlertSuccessProp);
    } catch (e) {
      enqueueSnackbar("An error occured", AlertErrorProp);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (data) setIngredients(data.ingredientsByUser.map((item) => item));
    }

    fetchData();
  }, [data]);
  const headCells = [
    {
      id: "sku",
      numeric: false,
      disablePadding: false,
      label: t("ingredient:SKU"),
    },
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: t("ingredient:Name"),
    },
    {
      id: "price",
      numeric: true,
      disablePadding: true,
      label: t("ingredient:Price"),
    },
    {
      id: "amountLeft",
      numeric: true,
      disablePadding: true,
      label: t("ingredient:Left"),
    },
    {
      id: "alertAmountLeft",
      numeric: true,
      disablePadding: true,
      label: t("ingredient:alert"),
    },
    {
      id: "description",
      numeric: false,
      disablePadding: true,
      label: t("ingredient:Description"),
    },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Toolbar />
        <Box py={3}>{}</Box>
        <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
          <BudaTable
            deleteItems={handleDelete}
            data={ingredients.reverse()}
            headCells={headCells}
            Modal={AddIngredientModal}
            type="ingredientID"
            DetailTableBody={IngredientTableBody}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Ingredient;
