import { useMutation, useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import BudaTable from "../../../buda-components/table/BudaTable";
import { DELETE_BUY_ORDER } from "../../../graphQl/buyorders/BuyOrderMutations";
import Sidebar from "../../../components/Sidebar";
import BuyOrderTableBody from "./components/BuyOrderTableBody";
import { LOAD_BUY_ORDERS } from "../../../graphQl/buyorders/BuyOrderQueries";
import AddStaffModal from "../../../components/modal/AddStaffModal";

const headCells = [
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
      >
        <Toolbar />
        <Box>{}</Box>
        <Box>
          <BudaTable
            deleteItems={handleDelete}
            data={buyOrders}
            headCells={headCells}
            Modal={AddStaffModal}
            DetailTableBody={BuyOrderTableBody}
            type="staffID"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default BuyOrder;
