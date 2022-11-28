import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BudaTable from "../../buda-components/table/BudaTable";
import { INCOMPLETED_SELL_ORDER } from "../../graphQl/dashboard/queries";
import IncompletedSellOrderTableBody from "./tableBody/IncompletedSellOrderTableBody";
// import { HIDE_PRODUCT_MUTATION } from "../graphQl/products/productMutations";

const IncompletedSellOrder = (props) => {
  //   const { t } = useTranslation(["common", "product"]);
  const [sellOrder, setSellOrder] = useState([]);
  const { error, loading, data } = useQuery(INCOMPLETED_SELL_ORDER);
  const {t} = useTranslation('dashboard');
  const toObject = (data1) => {
    let incompletedSellOrder = {};
    incompletedSellOrder.sellOrderID = data1?.sellOrderID;
    incompletedSellOrder.textID = data1?.textID;
    incompletedSellOrder.customerName = data1?.customer?.name;
    incompletedSellOrder.finalCost = data1?.finalCost;
    incompletedSellOrder.creationTime = data1?.creationTime;
    incompletedSellOrder.status = data1?.status;
    return incompletedSellOrder;
  };

  useEffect(() => {
    async function fetchData() {
      if (data) {
        setSellOrder(
          data.incompletedSellOrdersByUser.map((item) => toObject(item))
        );
      }
    }

    fetchData();
  }, [data]);
  
  const headCells = [
    {
      id: "textID",
      numeric: false,
      disablePadding: false,
      label: "ID",
    },
    {
      id: "customerName",
      numeric: false,
      disablePadding: false,
      label: t("dashboard:sellOrder.customer"),
    },
    {
      id: "creationTime",
      numeric: false,
      disablePadding: true,
      label: t("dashboard:sellOrder.creationTime"),
    },
    {
      id: "finalCost",
      numeric: true,
      disablePadding: true,
      label: t("dashboard:sellOrder.finalCost"),
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: t("dashboard:sellOrder.status"),
    },
    {
      id: "",
      numeric: false,
      disablePadding: true,
      label: t("dashboard:sellOrder.finish"),
    },
    {
      id: "",
      numeric: false,
      disablePadding: true,
      label: t("dashboard:sellOrder.cancel"),
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <BudaTable
          toolbar={false}
          data={sellOrder}
          headCells={headCells}
          isNotShowCheckBox={true}
          type="sellOrderID"
          DetailTableBody={IncompletedSellOrderTableBody}
        />
      </Box>
    </Box>
  );
};

export default IncompletedSellOrder;
