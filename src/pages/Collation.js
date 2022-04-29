import { useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CollationTableBody from "../components/table/body/CollationTableBody";
import { useTranslation } from "react-i18next";
import { LOAD_COLATIONS } from "../graphQl/collation/collationQueries";
import BudaTable from "../buda-components/table/BudaTable";


const Collation = (props) => {
  const { window } = props;
  const [products, setProducts] = useState([]);
  const { error, loading, data } = useQuery(LOAD_COLATIONS);
  const { t } = useTranslation(["common","product"]);
  const headCells = [
    {
      id: "productSKU",
      numeric: false,
      disablePadding: false,
      label: t("common:SKU"),
    },
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: t("product:Name"),
    },
    {
      id: "amountLeft",
      numeric: true,
      disablePadding: true,
      label: t("product:amountLeft"),
    },
    {
      id: "Edit",
      numeric: true,
      disablePadding: true,
      label: t("common:Edit"),
    },
  ];
  useEffect(() => {
    async function fetchData() {
      if (data) setProducts(data.productsByUser.map(item => item));
    }

    fetchData();
  }, [data]);

  if (error) return <Redirect to="/login" />;
  console.log(data)
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
            data={products.reverse()}
            headCells={headCells}
            type="productID"
            DetailTableBody={CollationTableBody}
            isNotShowCheckBox={true}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Collation;
