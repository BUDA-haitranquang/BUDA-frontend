import { useMutation, useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../buda-components/alert/BudaNoti";
import IngredientInformation from "../components/detail/information/IngredientInformation";
import IngredientCombinedDetail from "../components/IngredientCombinedDetail";
import EditIngredientModal from "../components/modal/EditIngredientsModal";
import RetailIngredientModal from "../components/modal/RetailIngredientModal";
import { HIDE_INGREDIENT_MUTATION } from "../graphQl/ingredients/ingredientMutation";
import {
  LOAD_INGREDIENT,
  LOAD_INGREDIENTS,
} from "../graphQl/ingredients/ingredientQueries";

const IngredientDetail = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const history = useHistory();
  const [ingredient, setIngredient] = useState(null);
  const { data } = useQuery(LOAD_INGREDIENT, {
    variables: { ingredientID: parseInt(id) },
  });
  const [hideIngredient] = useMutation(HIDE_INGREDIENT_MUTATION);

  const handleDeleteIngredient = () => {
    hideIngredient({
      variables: { ingredientID: parseInt(id) },
      refetchQueries: [{ query: LOAD_INGREDIENTS }],
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
      <Box pt={1}>
        {ingredient === null ? (
          <div></div>
        ) : (
          <IngredientCombinedDetail
            data={ingredient}
            Modal={EditIngredientModal}
            Information={IngredientInformation}
            handleDelete={handleDeleteIngredient}
            RetailModal={RetailIngredientModal}
          />
        )}
      </Box>
    </Box>
  );
};
export default IngredientDetail;
