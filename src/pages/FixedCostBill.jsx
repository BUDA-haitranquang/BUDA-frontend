import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BudaTable from "../buda-components/table/BudaTable";
import { LOAD_FIXED_COST_BILL } from "../graphQl/cost/fixedCostBill/fixedCostBillQueries";
import AddFixedCostBillModal from "../components/modal/AddFixedCostBillModal";
import FixedCostBillTableBody from "../components/table/body/FixedCostBIllTableBody";

const FixCostBill = () => {
  const [fixcosts, setFixCosts] = useState([]);
  const { data } = useQuery(LOAD_FIXED_COST_BILL);
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
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <BudaTable
          data={fixcosts}
          headCells={headCells}
          Modal={AddFixedCostBillModal}
          type="fixedCostBillID"
          DetailTableBody={FixedCostBillTableBody}
        />
      </Box>
    </Box>
  );
};

export default FixCostBill;
