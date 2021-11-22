import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import CombinedTable from "../components/CombinedTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/ingredientSlice";
import AddIngredientModal from "../components/modal/AddIngredientModal";
import IngredientTableBody from "../components/table/body/IngredientTableBody";

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
    id: "amount",
    numeric: true,
    disablePadding: true,
    label: "Left",
  },
  {
    id: "cost",
    numeric: true,
    disablePadding: true,
    label: "Cost",
  },
  {
    id: "group",
    numeric: false,
    disablePadding: true,
    label: "Group",
  },
];
const data =[{
  id:1,
  name: 'huyanh',
  price:"100",
  amount:'2840',
  left:"100",
  cost:"100" ,
  group:"ádhfo8asfasofs"
},
{
  id:2,
  name: 'huanh',
  price:"100",
  amount:'1204',
  left:"1023",
  cost:"1923" ,
  group:"ádhoisd",
},
{
  id:3,
  name: 'huyanh',
  price:"1940",
  left:"1023",
  group:"ádhioasd" ,
  
},
{
  id:4,
  name: 'yanh',
  price:"1230",
  left:"4230",
  group:"ádiaspd", 
},
]
const Ingredient = (props) => {
  const { window } = props;
  const ingredient = data;
  //const ingredient = useSelector((state) => state.ingredient.ingredients;
  //const dp = useDispatch();
  // useEffect(() => {
  //   dp(fetchData());
  // }, []);
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
          <CombinedTable data={ingredient} headCells={headCells} Modal={AddIngredientModal} Body={IngredientTableBody}/>
        </Box>
      </Box>
    </Box>
  );
};
export default Ingredient;
