import { useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import BudaTable from "../buda-components/table/BudaTable";
import CollationTableBody from "../components/table/body/CollationTableBody";
import { LOAD_COLATIONS } from "../graphQl/collation/collationQueries";

const Collation = (props : any) => {
  const [products, setProducts] = useState([]);
  const { error, loading, data } = useQuery(LOAD_COLATIONS);
  const { t } = useTranslation(["common", "product"]);
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
      label: t("product:name"),
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
      if (data) setProducts(data.productsByUser.map((item : any) => item));
    }

    fetchData();
  }, [data]);

  // if (error) return <Redirect to="/login" />;
  
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
            data={products}
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
