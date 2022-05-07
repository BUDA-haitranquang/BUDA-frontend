import { useMutation, useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BudaTable from "../../buda-components/table/BudaTable";
import { INCOMPLETED_SELL_ORDER } from "../../graphQl/dashboard/queries";
import IncompletedSellOrderTableBody from './tableBody/IncompletedSellOrderTableBody'
// import { HIDE_PRODUCT_MUTATION } from "../graphQl/products/productMutations";


const IncompletedSellOrder = (props) => {
//   const { t } = useTranslation(["common", "product"]);
  const [sellOrder, setSellOrder] = useState([]);
  const { error, loading, data } = useQuery(INCOMPLETED_SELL_ORDER);

  const toObject = (data1)=>{
      let incompletedSellOrder = {};
      incompletedSellOrder.sellOrderID = data1?.sellOrderID;
      incompletedSellOrder.textID = data1?.textID;
      incompletedSellOrder.customerName = data1?.customer?.name;
      incompletedSellOrder.finalCost = data1?.finalCost;
      incompletedSellOrder.creationTime = data1?.creationTime;
    //   incompletedSellOrder.status = data.status;
      return incompletedSellOrder;
  }  

  useEffect(() => {
    async function fetchData() {    
      if (data) {   
          setSellOrder(data.incompletedSellOrdersByUser.map((item) => toObject(item)));
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
      label:'ID'
    },
    {
      id: "customerName",
      numeric: false,
      disablePadding: false,
      label: 'Customer'
    },
    {
      id: "creationTime",
      numeric: false,
      disablePadding: true,
      label: "Creation Time"
    },
    {
      id: "finalCost",
      numeric: true,
      disablePadding: true,
      label: "final Cost"
    },
    // {
    //   id: "status",
    //   numeric: false,
    //   disablePadding: true,
    //   label: "Status"
    // },
  ];

  return (
    <Box sx={{ display: "flex" }}>
        <Box>
          <BudaTable
            data={sellOrder.reverse()}
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
