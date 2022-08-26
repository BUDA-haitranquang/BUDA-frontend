import { useMutation, useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReactToPrint } from "react-to-print";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../buda-components/alert/BudaNoti";
import BudaTable from "../buda-components/table/BudaTable";
import ProductBarcodeListPrintForm from "../components/printforms/ProductBarcodeListPrintForm";
import ProductTableBody from "../components/table/body/ProductTableBody";
import { HIDE_PRODUCT_MUTATION } from "../graphQl/products/productMutations";
import { LOAD_PRODUCTS } from "../graphQl/products/productQueries";
import AddProductModal from "../components/modal/AddProductModal";

const Product = (props: any) => {
  const { t } = useTranslation(["common", "product"]);
  const [products, setProducts] = useState([]);
  const { error, loading, data } = useQuery(LOAD_PRODUCTS);
  const [hideProduct] = useMutation(HIDE_PRODUCT_MUTATION);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [printItem, setPrintItem] = useState([]);
  const componentRef = useRef();

  const handleDelete = (selected: Array<any>) => {
    if (selected === []) return;
    setIsLoading(true);
    try {
      selected.forEach((item: any) => {
        hideProduct({
          variables: { productID: parseInt(item) },
          refetchQueries: [{ query: LOAD_PRODUCTS }],
        });
      });
      enqueueSnackbar("Delete item(s) successfully", AlertSuccessProp as any);
    } catch (e) {
      enqueueSnackbar("An error occured", AlertErrorProp as any);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = (val: any) => {
    let x = products.filter((item) => val.indexOf(item.productID) !== -1);
    setPrintItem(x);
  };

  useEffect(() => {
    async function fetchData() {
      if (data) {
        setProducts(data.productsByUser.map((item: any) => item));
      }
    }

    fetchData();
  }, [data]);

  const print = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (printItem && printItem.length > 0) {
      print();
    }
  }, [printItem]);

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
      label: t("product:productName"),
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
            data={products}
            headCells={headCells}
            Modal={AddProductModal}
            type="productID"
            DetailTableBody={ProductTableBody}
          />
          <Box maxWidth={150} mt={3} sx={{ position: "fixed", left: "100vw" }}>
            <ProductBarcodeListPrintForm
              ref={componentRef}
              listProduct={printItem as any}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
