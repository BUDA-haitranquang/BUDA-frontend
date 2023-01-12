import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BudaTable from "../../buda-components/table/BudaTable";
import { INCOMPLETED_FIXED_COST } from "../../graphQl/dashboard/queries";
import IncompletedFixedCostTableBody from "./tableBody/IncompletedFixedCostTableBody";

const IncompletedFixedCost = (props) => {
  const [fixedCost, setFixedCost] = useState([]);
  const { data } = useQuery(INCOMPLETED_FIXED_COST);
  const { t } = useTranslation("dashboard");
  const toObject = (data1) => {
    let incompleted = {};
    incompleted.fixedCostBillID = data1?.fixedCostBillID;
    incompleted.dueTime = data1?.dueTime;
    incompleted.totalSpend = data1?.totalSpend;
    incompleted.creationTime = data1?.creationTime;
    incompleted.status = data1?.status;
    return incompleted;
  };

  useEffect(() => {
    async function fetchData() {
      if (data) {
        setFixedCost(
          data.incompletedFixedCostBillsByUser.map((item) => toObject(item))
        );
      }
    }
    fetchData();
  }, [data]);

  // if(error) return <Redirect to="/login"/>;
  const headCells = [
    {
      id: "fixedCostBillID",
      numeric: false,
      disablePadding: false,
      label: "ID",
    },

    {
      id: "creationTime",
      numeric: false,
      disablePadding: true,
      label: t("dashboard:fixedCost.creationTime"),
    },
    {
      id: "dueTime",
      numeric: false,
      disablePadding: false,
      label: t("dashboard:fixedCost.dueTime"),
    },
    {
      id: "totalSpend",
      numeric: true,
      disablePadding: true,
      label: t("dashboard:fixedCost.moneyAmount"),
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: t("dashboard:fixedCost.status"),
    },
    {
      id: "",
      numeric: false,
      disablePadding: true,
      label: t("dashboard:fixedCost.finish"),
    },
    {
      id: "",
      numeric: false,
      disablePadding: true,
      label: t("dashboard:fixedCost.cancel"),
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <BudaTable
          toolbar={false}
          data={fixedCost}
          headCells={headCells}
          isNotShowCheckBox={true}
          type="fixedCostBillID"
          DetailTableBody={IncompletedFixedCostTableBody}
        />
      </Box>
    </Box>
  );
};

export default IncompletedFixedCost;
