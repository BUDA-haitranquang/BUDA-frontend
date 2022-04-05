import { useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CollationTableBody from "../components/table/body/CollationTableBody";
import { LOAD_PRODUCTS } from "../graphQl/products/productQueries";
import BudaTable from "../buda-components/table/BudaTable";
const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "amountLeft",
    numeric: true,
    disablePadding: true,
    label: "Total amount",
  },
  {
    id: "",
    numeric: true,
    disablePadding: true,
    label: "Actual amount",
  },
  {
    id: "",
    numeric: true,
    disablePadding: false,
    label: "Note",
  },
];

const Collation = (props) => {
  const { window } = props;
  const [products, setProducts] = useState([]);
  const { error, loading, data} = useQuery(LOAD_PRODUCTS);

  
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
    console.log(data);
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
          <BudaTable
            data={products}
            headCells={headCells}

            type='productID'
            DetailTableBody={CollationTableBody}
            isNotShowCheckBox = {true}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Collation;
