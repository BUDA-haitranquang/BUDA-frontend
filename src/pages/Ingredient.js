import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import AddIngredientModal from "../components/modal/AddIngredientModal";
import IngredientTableBody from "../components/table/body/IngredientTableBody";
import { useMutation, useQuery } from "@apollo/client";
import { HIDE_INGREDIENT_MUTATION } from "../graphQl/ingredients/ingredientMutation";
import { LOAD_INGREDIENTS } from "../graphQl/ingredients/ingredientQueries";
import BudaTable from "../buda-components/table/BudaTable";
import { useSnackbar } from "notistack";
import { AlertErrorProp, AlertSuccessProp } from "../buda-components/alert/BudaNoti";

const headCells = [
  // {
  //   id: "ID",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "ID",
  // },
  {
    id: "sku",
    numeric: false,
    disablePadding: false,
    label: "SKU"
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name"
  },
  {
    id: "price",
    numeric: true,
    disablePadding: true,
    label: "Price"
  },
  {
    id: "amountLeft",
    numeric: true,
    disablePadding: true,
    label: "Left"
  },
  {
    id: "alertAmountLeft",
    numeric: true,
    disablePadding: true,
    label: "Alert"
  },
  {
    id: "description",
    numeric: false,
    disablePadding: true,
    label: "Description"
  }
];

const Ingredient = (props) => {
  const { window } = props;
  const [ingredients, setIngredients] = useState([]);
  const { error, loading, data } = useQuery(LOAD_INGREDIENTS);
  const [hideIngredient] = useMutation(HIDE_INGREDIENT_MUTATION);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = (selected) => {
    if (selected === []) return;
    setIsLoading(true);
    try {
      selected.forEach((item) => {
        hideIngredient({
          variables: { ingredientID: parseInt(item) },
          refetchQueries: [{ query: LOAD_INGREDIENTS }]
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
      if (data) setIngredients(data.ingredientsByUser.map(item => item));
    }

    fetchData();
  }, [data]);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Ingredient" />
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Toolbar />
        <Box>{}</Box>
        <Box>
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
