import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { LOAD_SELL_ORDER } from "../graphQl/sellOrder/sellOrderQueries";
import { useMutation } from "@apollo/client";
import { DELETE_SELL_ORDER_MUTATION } from "../graphQl/sellOrder/newSellOrderMutation";
// import BudaTableServer from "../buda-components/tableservertable/BudaServerTable";
import BudaServerTable from "../buda-components/budaservertable/BudaServerTable";
import SellOrderTableBody from "../components/table/body/SellOrderTableBody";
import { useSnackbar } from "notistack";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../buda-components/alert/BudaNoti";
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
    label: "Customer",
  },
  {
    id: "finalCost",
    numeric: true,
    disablePadding: true,
    label: "Final cost",
  },
  {
    id: "creationTime",
    numeric: true,
    disablePadding: true,
    label: "Creation time",
  },
  {
    id: "finishTime",
    numeric: true,
    disablePadding: true,
    label: "Finish time",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
  },
];

const SellOrderList = (props) => {
  const { window } = props;
  // const { error, loading, data } = useQuery(LOAD_SELL_ORDER);
  const [deleteSellOrder] = useMutation(DELETE_SELL_ORDER_MUTATION);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = (selected) => {
    if (selected === []) return;
    setIsLoading(true);
    try {
      selected.forEach((item) => {
        deleteSellOrder({
          variables: { sellOrderID: parseInt(item) },
          refetchQueries: [{ query: LOAD_SELL_ORDER }],
        });
      });
      enqueueSnackbar("Delete item(s) successfully", AlertSuccessProp);
    } catch (e) {
      enqueueSnackbar("An error occured", AlertErrorProp);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Sell order" />
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
          <BudaServerTable
            deleteItems={handleDelete}
            headCells={headCells}
            type="id"
            DetailTableBody={SellOrderTableBody}
            searchBar = {false}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SellOrderList;
