import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BudaTable from "../../buda-components/table/BudaTable";
import { INCOMPLETED_OTHER_COST } from "../../graphQl/dashboard/queries";
import IncompletedOtherCostTableBody from "./tableBody/IncompletedOtherCostTableBody";

const IncompletedOtherCost = (props) => {
  const [otherCost, setOtherCost] = useState([]);
  const { data } = useQuery(INCOMPLETED_OTHER_COST);
  const { t } = useTranslation("dashboard");
  const toObject = (data1) => {
    let incompleted = {};
    incompleted.otherCostID = data1?.otherCostID;
    incompleted.name = data1?.name;
    incompleted.totalCost = data1?.totalCost;
    incompleted.creationTime = data1?.creationTime;
    incompleted.status = data1?.status;
    return incompleted;
  };

  useEffect(() => {
    async function fetchData() {
      if (data) {
        setOtherCost(
          data.incompletedOtherCostsByUser.map((item) => toObject(item))
        );
      }
    }

    fetchData();
  }, [data]);

  // if(error) return <Redirect to="/login"/>;
  const headCells = [
    // {
    //   id: "otherCostID",
    //   numeric: false,
    //   disablePadding: false,
    //   label:'ID'
    // },
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: t("dashboard:otherCost.name"),
    },
    {
      id: "creationTime",
      numeric: false,
      disablePadding: true,
      label: t("dashboard:otherCost.creationTime"),
    },
    {
      id: "totalCost",
      numeric: true,
      disablePadding: true,
      label: t("dashboard:otherCost.totalCost"),
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: t("dashboard:otherCost.status"),
    },
    {
      id: "",
      numeric: false,
      disablePadding: true,
      label: t("dashboard:otherCost.finish"),
    },
    {
      id: "",
      numeric: false,
      disablePadding: true,
      label: t("dashboard:otherCost.cancel"),
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <BudaTable
          toolbar={false}
          data={otherCost}
          headCells={headCells}
          isNotShowCheckBox={true}
          type="otherCostID"
          DetailTableBody={IncompletedOtherCostTableBody}
        />
      </Box>
    </Box>
  );
};

export default IncompletedOtherCost;
