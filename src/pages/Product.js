import { useMutation, useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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

const Product = (props) => {
  
  const { t } = useTranslation(["common", "product"]);
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
      if (data) setProducts(data.productsByUser.map(item => item));
    }
    fetchData();
  }, [data]);

  // if(error) return <Redirect to="/login"/>;

  const headCells = [
    {
      id: "sku",
      numeric: false,
      disablePadding: false,
      label: t("product:sku"),
    },
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: t("product:name"),
    },
    {
      id: "sellingPrice",
      numeric: true,
      disablePadding: true,
      label: t("product:price"),
    },
    {
      id: "amountLeft",
      numeric: true,
      disablePadding: true,
      label: t("product:amountLeft"),
    },
    {
      id: "alertAmount",
      numeric: true,
      disablePadding: true,
      label: t("product:alertAmount"),
    },
    {
      id: "costPerUnit",
      numeric: true,
      disablePadding: true,
      label: t("product:cost"),
    },
    {
      id: "description",
      numeric: false,
      disablePadding: true,
      label: t("product:description"),
    },
  ];

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
            data={products.reverse()}
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
