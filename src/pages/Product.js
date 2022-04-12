import { useMutation, useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../buda-components/alert/BudaNoti";
import BudaTable from "../buda-components/table/BudaTable";
import AddProductModal from "../components/modal/AddProductModal";
import Sidebar from "../components/Sidebar";
import ProductTableBody from "../components/table/body/ProductTableBody";
import { HIDE_PRODUCT_MUTATION } from "../graphQl/products/productMutations";
import { LOAD_PRODUCTS } from "../graphQl/products/productQueries";
const headCells = [
  // {
  //   id: "ID",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "ID",
  // },
  {
    id: "sku",
    numeric: false,
    disablePadding: false,
    label: "SKU",
  },
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
    numeric: false,
    disablePadding: true,
    label: "Description",
  },
];

const Product = (props) => {
  const { window } = props;
  const [products, setProducts] = useState([]);
  const { error, loading, data } = useQuery(LOAD_PRODUCTS);
  const [hideProduct] = useMutation(HIDE_PRODUCT_MUTATION);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = (selected) => {
    if (selected === []) return;
    setIsLoading(true);
    try {
      selected.forEach((item) => {
        hideProduct({
          variables: { productID: parseInt(item) },
          refetchQueries: [{ query: LOAD_PRODUCTS }],
        });
      });
      enqueueSnackbar("Delete item(s) successfully", AlertSuccessProp);
    } catch (e) {
      enqueueSnackbar("An error occured", AlertErrorProp);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (data) setProducts(data.productsByUser);
    }
    fetchData();
  }, [data]);

  // if(error) return <Redirect to="/login"/>;

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
            deleteItems={handleDelete}
            data={products}
            headCells={headCells}
            Modal={AddProductModal}
            type="productID"
            DetailTableBody={ProductTableBody}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
