import { useMutation, useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BudaTable from "../../buda-components/table/BudaTable";
import { INCOMPLETED_BUY_ORDER } from "../../graphQl/dashboard/queries";
import IncompletedBuyOrderTableBody from "./tableBody/IncompletedBuyOrderTableBody";
// import { HIDE_PRODUCT_MUTATION } from "../graphQl/products/productMutations";

const IncompletedBuyOrder = (props) => {
  //   const { t } = useTranslation(["common", "product"]);
  const [buyOrder, setBuyOrder] = useState([]);
  const { error, loading, data } = useQuery(INCOMPLETED_BUY_ORDER);
  const {t} = useTranslation('dashboard');
  const toObject = (data1) => {
    let incompletedBuyOrder = {};
    incompletedBuyOrder.sellOrderID = data1?.sellOrderID;
    incompletedBuyOrder.textID = data1?.textID;
    incompletedBuyOrder.supplierName = data1?.supplier?.name;
    incompletedBuyOrder.totalCost = data1?.totalCost;
    incompletedBuyOrder.creationTime = data1?.creationTime;
    incompletedBuyOrder.status = data1?.status;
    return incompletedBuyOrder;
  };

  useEffect(() => {
    async function fetchData() {
      if (data) {
        setBuyOrder(
          data.incompletedBuyOrdersByUser.map((item) => toObject(item))
        );
      }
    }
    fetchData();
  }, [data]);

  // if(error) return <Redirect to="/login"/>;
  const headCells = [
    {
      id: "textID",
      numeric: false,
      disablePadding: false,
      label: "ID",
    },
    {
      id: "supplierName",
      numeric: false,
      disablePadding: false,
      label: t("dashboard:buyOrder.supplier"),
    },
    {
      id: "creationTime",
      numeric: false,
      disablePadding: true,
      label: t("dashboard:buyOrder.creationTime"),
    },
    {
      id: "totalCost",
      numeric: true,
      disablePadding: true,
      label: t("dashboard:buyOrder.totalCost"),
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: t("dashboard:buyOrder.status"),
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <BudaTable
          toolbar={false}
          data={buyOrder}
          headCells={headCells}
          isNotShowCheckBox={true}
          type="buyOrderID"
          DetailTableBody={IncompletedBuyOrderTableBody}
        />
      </Box>
    </Box>
  );
};

export default IncompletedBuyOrder;
