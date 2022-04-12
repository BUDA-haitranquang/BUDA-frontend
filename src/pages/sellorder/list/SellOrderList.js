import { Toolbar } from "@mui/material";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import BudaServerTable from "../../../buda-components/budaservertable/BudaServerTable";
import SellOrderTableBody from "../../../components/table/body/SellOrderTableBody";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
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
  const history = useHistory();
  return (
    <Box sx={{ display: "flex",margin:'6px' }}>
      <Sidebar window={window} name="Sell order" />
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
          Create sell order
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
