import { useMutation, useQuery } from "@apollo/client";
import { Button, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import BudaTable from "../../../buda-components/table/BudaTable";
import { DELETE_BUY_ORDER } from "../../../graphQl/buyorders/BuyOrderMutations";
import Sidebar from "../../../components/Sidebar";
import BuyOrderTableBody from "./components/BuyOrderTableBody";
import { LOAD_BUY_ORDERS } from "../../../graphQl/buyorders/BuyOrderQueries";

const headCells = [
  {
    id: "textID",
    numeric: false,
    disablePadding: false,
    label: "Text ID",
  },
  {
    id: "supplierName",
    numeric: false,
    disablePadding: false,
    label: "Supplier name",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
  },
  {
    id: "totalCost",
    numeric: true,
    disablePadding: true,
    label: "Total cost",
  },
  {
    id: "createdBy",
    numeric: false,
    disablePadding: true,
    label: "Created by",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: true,
    label: "Created at",
  },
];

const BuyOrder = (props) => {
  const { window } = props;
  const [buyOrders, setBuyOrders] = useState([]);
  const history = useHistory();
  const { error, loading, data } = useQuery(LOAD_BUY_ORDERS);
  const [deleteBuyOrder] = useMutation(DELETE_BUY_ORDER);

  useEffect(() => {
    async function fetchData() {
      if (data) {
        let buyOrdersByUser = [...data.buyOrdersByUser];
        setBuyOrders(buyOrdersByUser.reverse());
      }
    }

    fetchData();
  }, [data]);

  if (error) return <Redirect to="/login" />;

  const handleDelete = (selected) => {
    if (selected === []) return;
    selected.forEach((item) => {
      deleteBuyOrder({
        variables: { buyOrderID: parseInt(item) },
        refetchQueries: [{ query: LOAD_BUY_ORDERS }],
      });
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Buy Order" />
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
          onClick={() => history.push(`/buy-order/create`)}
        >
          Create buy order
        </Button>
        <BudaTable
          deleteItems={handleDelete}
          data={buyOrders}
          headCells={headCells}
          DetailTableBody={BuyOrderTableBody}
          type="buyOrderID"
        />
      </Box>
    </Box>
  );
};
export default BuyOrder;
