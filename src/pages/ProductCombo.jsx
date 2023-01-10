import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProductComboTableBody from "src/components/table/body/ProductComboTableBody";
import { LOAD_PRODUCT_COMBOS } from "src/graphQl/products/productQueries";
import BudaTable from "../buda-components/table/BudaTable";

const Product = () => {
  const { t } = useTranslation(["common", "product"]);
  const [productCombos, setProductCombos] = useState([]);
  const { error, loading, data } = useQuery(LOAD_PRODUCT_COMBOS);
  // const [hideProduct] = useMutation(HIDE_PRODUCT_MUTATION);

  // const handleDelete = (selected) => {
  //   if (selected === []) return;
  //   setIsLoading(true);
  //   try {
  //     selected.forEach((item) => {
  //       hideProduct({
  //         variables: { productID: parseInt(item) },
  //         refetchQueries: [{ query: LOAD_PRODUCTS }],
  //       });
  //     });
  //     enqueueSnackbar("Delete item(s) successfully", AlertSuccessProp);
  //   } catch (e) {
  //     enqueueSnackbar("An error occured", AlertErrorProp);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    async function fetchData() {
      if (data) {
        setProductCombos(data.productComboByUser.map((item) => item));
      }
    }

    fetchData();
  }, [data]);

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: t("product:productName"),
    },
    {
      id: "description",
      numeric: false,
      disablePadding: true,
      label: t("product:description"),
    },
    {
      id: "detail",
      label: t("common:detail"),
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
        <BudaTable
          // deleteItems={handleDelete}
          data={productCombos}
          headCells={headCells}
          // Modal={AddProductModal}
          type="productComboID"
          DetailTableBody={ProductComboTableBody}
          isNotShowCheckBox={true}
        />
      </Box>
    </Box>
  );
};

export default Product;
