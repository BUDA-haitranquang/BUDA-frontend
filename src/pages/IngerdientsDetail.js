import { useMutation, useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Redirect } from "react-router-dom";
import { AlertErrorProp, AlertSuccessProp } from "../buda-components/alert/BudaNoti";
import CombinedDetail from "../components/CombinedDetail";
import IngredientInformation from "../components/detail/information/IngredientInformation";
import Sidebar from "../components/Sidebar";
import EditIngredientModal from "../components/modal/EditIngredientsModal";
import { HIDE_INGREDIENT_MUTATION } from "../graphQl/ingredients/ingredientMutation";
import { LOAD_INGREDIENT, LOAD_INGREDIENTS } from "../graphQl/ingredients/ingredientQueries";

const IngredientDetail = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { window } = props;
  const { id } = useParams();
  const history = useHistory();
  const [ingredient, setIngredient] = useState(null);
  const { error, loading, data, refetch } = useQuery(LOAD_INGREDIENT, { variables: { ingredientID: parseInt(id) } });
  const [hideIngredient] = useMutation(HIDE_INGREDIENT_MUTATION);
  const handleDeleteIngredient = () => {
    hideIngredient({
      variables: { ingredientID: parseInt(id) },
      refetchQueries: [{ query: LOAD_INGREDIENTS }]
    })
      .then(history.push("/ingredient"))
      .then((res) => {
        enqueueSnackbar("Ingredient deleted", AlertSuccessProp);
      })
      .catch((e) => enqueueSnackbar("An error happened", AlertErrorProp));
  };
  useEffect(() => {
    async function fetchData() {
      if (data) setIngredient(data);
    }

    fetchData();
  }, [data]);
  // if (error) return <Redirect to="/login" />;
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Ingredient Detail" id="ingredient" />
      <Box>
        <Toolbar />
        <Box pt={1}>
          {ingredient === null ? (
            <div></div>
          ) : (
            <CombinedDetail
              data={ingredient}
              Modal={EditIngredientModal}
              Information={IngredientInformation}
              handleDelete={handleDeleteIngredient}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default IngredientDetail;