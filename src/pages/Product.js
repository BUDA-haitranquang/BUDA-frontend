import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import CombinedTable from "../components/CombinedTable";
import AddProductModal from "../components/modal/AddProductModal";
import ProductTableBody from "../components/table/body/ProductTableBody";
import { useQuery } from "@apollo/client";
import { LOAD_PRODUCTS } from "../graphQl/products/productQueries";

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
  const [reload, setReload] = useState(false);
  const { error, loading, data, refetch } = useQuery(LOAD_PRODUCTS);

  console.log(reload);

  useEffect(() => {
    refetch();
    if (data) {
      setTimeout(() => {
        setProducts(data.productsByUser);
      }, 500);
    }
  }, [data, reload]);

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
          {console.log(products)}
          <CombinedTable
            data={products}
            headCells={headCells}
            Modal={AddProductModal}
            Body={ProductTableBody}
            setReloadToggle={setReload}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Product;
