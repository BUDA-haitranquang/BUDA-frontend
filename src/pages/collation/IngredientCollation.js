import { useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import IngredientCollationTableBody from "../../components/table/body/IngredientCollationTableBody";
import { Ingredient_Collation } from "../../graphQl/ingredients/ingredientQueries";
import BudaTable from "../../buda-components/table/BudaTable";

const headCells = [
  {
    id: "ingredientSKU",
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
    id: "message",
    numeric: false,
    disablePadding: false,
    label: "Message"
  },
  {
    id: "amountLeft",
    numeric: true,
    disablePadding: true,
    label: "Amount Left"
  },
  {
    id: "Edit",
    numeric: true,
    disablePadding: true,
    label: "Edit"
  }
];

const IngredientCollation = (props) => {
  const { window } = props;
  const [ingredients, setIngredients] = useState([]);
  const { error, loading, data } = useQuery(Ingredient_Collation);

  useEffect(() => {
    async function fetchData() {
      if (data) setIngredients(data.ingredientsByUser.map(item => item));
    }

    fetchData();
  }, [data]);

  if (error) return <Redirect to="/login" />;
  
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Ingredient Collation" id="ingredient"/>
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
