import { useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import CombinedTable from "../components/CombinedTable";
import AddProductModal from "../components/modal/AddProductModal";
import Sidebar from "../components/Sidebar";
import ProductTableBody from "../components/table/body/ProductTableBody";
import { LOAD_PRODUCTS } from "../graphQl/products/productQueries";
import { useMutation } from "@apollo/client";
import { HIDE_PRODUCT_MUTATION } from "../graphQl/products/productMutations";
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
    id: "sellingPrice",
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
    id: "alertAmount",
    numeric: true,
    disablePadding: true,
    label: "Alert",
  },
  {
    id: "costPerUnit",
    numeric: true,
    disablePadding: true,
    label: "Cost",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: true,
    label: "Description",
  },
];

const Product = (props) => {
  const { window } = props;
  const [products, setProducts] = useState([]);
  const { error, loading, data} = useQuery(LOAD_PRODUCTS);
  const [hideProduct] = useMutation(HIDE_PRODUCT_MUTATION);
  
  const handleDelete = (selected) =>{
      if (selected===[]) return 
      selected.forEach(
        (item)=>{
          hideProduct({
            variables:{productID: parseInt(item)},
            refetchQueries: [{query: LOAD_PRODUCTS}]
          })
        }
      )
  }

  useEffect(() => {
    async function fetchData(){
      if(data) setProducts(data.productsByUser);
    }
    
    fetchData();
  }, [data]); 

  if(error) return <Redirect to="/login"/>;

  return (
    <Box sx={{ display: "flex" }}>
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
          <CombinedTable
            deleteItems={handleDelete}
            data={products}
            headCells={headCells}
            Modal={AddProductModal}
            Body={ProductTableBody}
            type='productID'
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Product;
