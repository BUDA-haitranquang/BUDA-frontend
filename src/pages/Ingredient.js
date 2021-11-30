import React, { useEffect,useState } from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import CombinedTable from "../components/CombinedTable";
import AddIngredientModal from "../components/modal/AddIngredientModal";
import IngredientTableBody from "../components/table/body/IngredientTableBody";
import { useQuery } from "@apollo/client";
import { LOAD_INGREDIENTS } from "../graphQl/ingredients/ingredientQueries";
const headCells = [
  // {
  //   id: "ID",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "ID",
  // },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: true,
    label: "Price",
  },
  {
    id: "amountLeft",
    numeric: true,
    disablePadding: true,
    label: "Left",
  },
  {
    id: "alertAmountLeft",
    numeric: true,
    disablePadding: true,
    label: "Alert",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: true,
    label: "Description",
  },
];

const Ingredient = (props) => {
  const { window } = props;
  const [ingredients,setIngredients] = useState([]);
  const {error,loading,data} = useQuery(LOAD_INGREDIENTS);
  useEffect(()=>{
    if (data) setIngredients(data.ingredientsByUser);
  },[data]);
  return (
    <Box sx={{display: "flex"}}>
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
          <CombinedTable data={ingredients} headCells={headCells} Modal={AddIngredientModal} Body={IngredientTableBody}/>
        </Box>
      </Box>
    </Box>
  );
};
export default Ingredient;
