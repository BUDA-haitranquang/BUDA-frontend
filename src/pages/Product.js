import { useMutation, useQuery } from "@apollo/client";
import { Button, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { AlertErrorProp, AlertSuccessProp } from "../buda-components/alert/BudaNoti";
import BudaTable from "../buda-components/table/BudaTable";
import AddProductModal from "../components/modal/AddProductModal";
import ProductBarcodeListPrintForm from "../components/printforms/ProductBarcodeListPrintForm";
import ProductTableBody from "../components/table/body/ProductTableBody";
import { HIDE_PRODUCT_MUTATION } from "../graphQl/products/productMutations";
import { LOAD_PRODUCTS } from "../graphQl/products/productQueries";
import PrintIcon from "@mui/icons-material/Print";

const Product = (props) => {
  const { t } = useTranslation(["common", "product"]);
  const [products, setProducts] = useState([]);
  const { error, loading, data } = useQuery(LOAD_PRODUCTS);
  const [hideProduct] = useMutation(HIDE_PRODUCT_MUTATION);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const componentRef = useRef();

  const handleDelete = (selected) => {
    if (selected === []) return;
    setIsLoading(true);
    try {
      selected.forEach((item) => {
        hideProduct({
          variables: { productID: parseInt(item) },
          refetchQueries: [{ query: LOAD_PRODUCTS }]
        });
      });
      enqueueSnackbar("Delete item(s) successfully", AlertSuccessProp);
    } catch (e) {
      enqueueSnackbar("An error occured", AlertErrorProp);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    async function fetchData() {
      if (data) setProducts(data.productsByUser.map((item) => item));
    }

    fetchData();
  }, [data]);

  // if(error) return <Redirect to="/login"/>;

  const headCells = [
    {
      id: "sku",
      numeric: false,
      disablePadding: false,
      label: t("product:sku")
    },
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: t("product:productName")
    },
    {
      id: "sellingPrice",
      numeric: true,
      disablePadding: true,
      label: t("product:price")
    },
    {
      id: "amountLeft",
      numeric: true,
      disablePadding: true,
      label: t("product:amountLeft")
    },
    {
      id: "alertAmount",
      numeric: true,
      disablePadding: true,
      label: t("product:alertAmount")
    },
    {
      id: "costPerUnit",
      numeric: true,
      disablePadding: true,
      label: t("product:cost")
    },
    {
      id: "description",
      numeric: false,
      disablePadding: true,
      label: t("product:description")
    }
  ];

  return (
    <Box sx={{ display: "flex" }}>
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
            printable={true}
            printItems={handlePrint}
            data={products.reverse()}
            headCells={headCells}
            Modal={AddProductModal}
            type="productID"
            DetailTableBody={ProductTableBody}
          />
          <Box maxWidth={150} mt={3} sx={{ position: "fixed", left: "100vw" }}>
            <ProductBarcodeListPrintForm
              ref={componentRef}
              listProduct={products}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
