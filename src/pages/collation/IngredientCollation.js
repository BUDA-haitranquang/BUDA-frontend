import { useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import IngredientCollationTableBody from "../../components/table/body/IngredientCollationTableBody";
import { Ingredient_Collation } from "../../graphQl/ingredients/ingredientQueries";
import BudaTable from "../../buda-components/table/BudaTable";
import { useTranslation } from "react-i18next";

const IngredientCollation = (props) => {
  const { t } = useTranslation("ingredientCollation");
  const [ingredients, setIngredients] = useState([]);
  const { error, loading, data } = useQuery(Ingredient_Collation);
  const headCells = [
    {
      id: "ingredientSKU",
      numeric: false,
      disablePadding: false,
      label: "SKU",
    },
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: t("ingredientCollation:ingredient"),
    },
    {
      id: "message",
      numeric: false,
      disablePadding: false,
      label: t("ingredientCollation:message"),
    },
    {
      id: "amountLeft",
      numeric: true,
      disablePadding: true,
      label: t("ingredientCollation:amountLeft"),
    },
    {
      id: "Edit",
      numeric: true,
      disablePadding: true,
      label: t("ingredientCollation:edit"),
    },
  ];
  useEffect(() => {
    async function fetchData() {
      if (data) setIngredients(data.ingredientsByUser.map((item) => item));
    }

    fetchData();
  }, [data]);

  // if (error) return <Redirect to="/login" />;

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
        <Box>{}</Box>
        <Box>
          <BudaTable
            data={ingredients.reverse()}
            headCells={headCells}
            type="ingredientID"
            DetailTableBody={IngredientCollationTableBody}
            isNotShowCheckBox={true}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default IngredientCollation;
