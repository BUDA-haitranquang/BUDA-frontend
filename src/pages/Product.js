import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import CombinedTable from "../components/CombinedTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/productSlice";
import AddProductModal from "../components/modal/AddProductModal";
import ProductTableBody from "../components/table/body/ProductTableBody";

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
  price:"",
  left:"",
  cost:"" ,
  group:""
},
{
  id:2,
  name: 'huanh',
  price:"",
  left:"",
  cost:"" ,
  group:"",
},
{
  id:3,
  name: 'huyanh',
  price:"",
  left:"",
  group:"" ,
  
},
{
  id:4,
  name: 'yanh',
  price:"",
  left:"",
  group:"" 
},
]
const Product = (props) => {
  const { window } = props;
  const products = data;//useSelector((state) => state.product.products);
  const dp = useDispatch();
  // useEffect(() => {
  //   dp(fetchData());
  // }, []);
  return (
    <Box sx={{display: "flex"}}>
      <Sidebar window={window} name="Product" />
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
          <CombinedTable data={products} headCells={headCells} Modal={AddProductModal} Body={ProductTableBody}/>
        </Box>
      </Box>
    </Box>
  );
};
export default Product;
