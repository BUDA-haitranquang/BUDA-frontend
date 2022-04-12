import { useMutation, useQuery } from "@apollo/client";
import { ImportantDevicesOutlined } from "@mui/icons-material";
import { Button, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import BudaTable from "../../../buda-components/table/BudaTable";
import { DELETE_SELL_ORDER } from "../../../graphQl/sellOrder/SellOrderMutation";
import Sidebar from "../../../components/Sidebar";
import SellOrderTableBody from "./components/SellOrderTableBody";
import { LOAD_SELL_ORDERS } from "../../../graphQl/sellOrder/SellOrderQueries";

const headCells = [
    {
      id: "textID",
      numeric: false,
      disablePadding: false,
      label: "Text ID",
    },
    {
      id: "CustomerName",
      numeric: false,
      disablePadding: false,
      label: "Customer name",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: "Status",
    },
    {
      id: "finalCost",
      numeric: true,
      disablePadding: true,
      label: "Final cost",
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

  const SellOrder = (props) => {
    const { window } = props;
    const [sellOrders, setSellOrders] = useState([]);
    const history = useHistory();
    const { error, loading, data } = useQuery(LOAD_SELL_ORDERS);
    const [ deleteSellOrder ] = useMutation(DELETE_SELL_ORDER);
  
    useEffect(() => {
      async function fetchData() {
        if (data) {
          let sellOrdersByUser = [...data.sellOrdersByUser];
          setSellOrders(sellOrdersByUser.reverse());
        }
      }
  
      fetchData();
    }, [data]);
  
    if (error) return <Redirect to="/login" />;
  
    const handleDelete = (selected) => {
      if (selected === []) return;
      selected.forEach((item) => {
        deleteSellOrder({
          variables: { sellOrderID: parseInt(item) },
          refetchQueries: [{ query: LOAD_SELL_ORDERS }],
        });
      });
    };
  
    return (
      <Box sx={{ display: "flex" }}>
        <Sidebar window={window} name="Sell Order" />
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
            onClick={() => history.push(`/sell-order/create`)}
          >
            Create sell order
          </Button>
          <BudaTable
            deleteItems={handleDelete}
            data={sellOrders}
            headCells={headCells}
            DetailTableBody={SellOrderTableBody}
            type="sellOrderID"
          />
        </Box>
      </Box>
    );
  };
  export default SellOrder;
  