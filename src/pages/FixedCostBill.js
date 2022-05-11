import { useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { LOAD_FIXED_COST_BILL } from "../graphQl/cost/fixedCostBill/fixedCostBillQueries";
import BudaTable from "../buda-components/table/BudaTable";
import { useTranslation } from "react-i18next";
// import BillTable  from "../buda-components/table/FixedCostBillTable";
import AddFixedCostBillModal from "../components/modal/AddFixedCostBillModal";
import FixedCostBillTableBody from "../components/table/body/FixedCostBIllTableBody";

const FixCostBill = (props) => {
  const { window } = props;
  const [fixcosts, setFixCosts] = useState([]);
  const { error, loading, data } = useQuery(LOAD_FIXED_COST_BILL);
  const { t } = useTranslation(["common", "cost"]);
  const headCells = [
    {
      id: "message",
      numeric: false,
      disablePadding: false,
      label: t("cost:message"),
    },
    {
      id: "dueTime",
      numeric: false,
      disablePadding: false,
      label: t("cost:dueTime"),
    },
    {
      id: "creationTime",
      numeric: false,
      disablePadding: false,
      label: t("cost:creationTime"),
    },
    {
      id: "totalSpend",
      numeric: false,
      disablePadding: false,
      label: t("cost:totalSpend"),
    },
  ];
  
  useEffect(() => {
    async function fetchData() {
      if (data) setFixCosts(data.fixedCostBillsByUser.map((item) => item));
    }
    fetchData();
  }, [data]);

  // if (error) return <Redirect to="/login" />;

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Bill Cost" id="cost" />
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
            data={fixcosts.reverse()}
            headCells={headCells}
            Modal={AddFixedCostBillModal}
            type="fixedCostBillID"
            DetailTableBody={FixedCostBillTableBody}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FixCostBill;
