import { Box, Button, Toolbar } from "@mui/material";
import React from "react";
import Sidebar from "../../../components/Sidebar";
import BudaServerTable from "../../../buda-components/budaservertable/BudaServerTable";
import SellOrderTableBody from "../../../components/table/body/SellOrderTableBody";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTranslation } from "react-i18next";

const SellOrderList = (props) => {
  const { window } = props;
  const history = useHistory();
  const {t} = useTranslation('sellOrderHistory')
  const headCells = [
    {
      id: "sellOrderID",
      numeric: false,
      disablePadding: false,
      label: "ID",
    },
    {
      id: "customerName",
      numeric: false,
      disablePadding: true,
      label: t("sellOrderHistory:table.customer"),
    },
    {
      id: "finalCost",
      numeric: true,
      disablePadding: true,
      label:  t("sellOrderHistory:table.finalCost"),
    },
    {
      id: "creationTime",
      numeric: true,
      disablePadding: true,
      label:  t("sellOrderHistory:table.creationTime"),
    },
    {
      id: "finishTime",
      numeric: true,
      disablePadding: true,
      label:  t("sellOrderHistory:table.finishTime"),
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label:  t("sellOrderHistory:table.status"),
    },
  ];
  
  return (
    <Box sx={{ display: "flex", margin: "6px" }}>
      <Sidebar window={window} name={ t("sellOrderHistory:title")} id="business" />
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        m={3}
      >
        <Toolbar />

        <Button
          variant="contained"
          color="primary"
          style={{ alignSelf: "flex-end" }}
          onClick={() => history.push(`/business/sell`)}
        >
           {t("sellOrderHistory:createSellOrder")}
        </Button>

        <BudaServerTable
          headCells={headCells}
          type="id"
          DetailTableBody={SellOrderTableBody}
          searchBar={false}
          isNotShowCheckBox={true}
        />
      </Box>
    </Box>
  );
};

export default SellOrderList;
