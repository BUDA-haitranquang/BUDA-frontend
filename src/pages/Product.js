import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import CombinedTable from "../components/CombinedTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, setProduct } from "../redux/productSlice";
import AddProductModal from "../components/modal/AddProductModal";
import ProductTableBody from "../components/table/body/ProductTableBody";
import { useQuery } from "@apollo/client";
import { LOAD_PRODUCTS } from "../graphQl/queries";

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
    id: "alert",
    numeric: true,
    disablePadding: true,
    label: "Alert",
  },
  {
    id: "cost",
    numeric: true,
    disablePadding: true,
    label: "Cost",
  },
];

const Product = (props) => {
  const { window } = props;
  const products = useSelector((state) => state.product.products);
  const dp = useDispatch();
  const {error, loading, data} = useQuery(LOAD_PRODUCTS);


  useEffect(() => {
    console.log(data);
    if(data) dp(setProduct(data.productsByUser));
  }, [data]);

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
