import { useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import AddSellOrderModal from "../components/modal/AddSellOrderModal";
import Sidebar from "../components/Sidebar";
import SellOrderTableBody from "../components/table/body/sellOrderTableBody";
import { LOAD_SELL_ORDER } from "../graphQl/sellOrder/sellOrderQueries";
import { useMutation } from "@apollo/client";
import BudaTable from "../buda-components/table/BudaTable";
import { useSnackbar } from "notistack";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../buda-components/alert/BudaNoti";

const headCells = [
    {
        id: "actualDiscountCash",
        numeric: true,
        disablePadding: true,
        label: "actualDiscountCash",
    },
    {
        id: "actualDiscountPercentage",
        numeric: true,
        disablePadding: true,
        label: "actualDiscountPercentage",
    },
    {
        id: "realCost",
        numeric: true,
        disablePadding: true,
        label: "realCost",
    },
    {
        id: "finalCost",
        numeric: true,
        disablePadding: true,
        label: "finalCost",
    },
    {
        id: "customerMessage",
        numeric: false,
        disablePadding: true,
        label: "customerMessage",
    }
]

const SellOrderBusiness = (props) =>{
    const { window } = props;
    const [ sellorder,setSellorder ] = useState([]);
    const { error,loading,data} = useQuery(LOAD_SELL_ORDER);
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
          if (data) setSellorder(data.sellOrdersByUser);
        }
        fetchData();
      },[data])
    
      return (
        <Box sx={{ display: "flex" }}>
          <Sidebar window={window} name="Sell Order" />
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
                
                data={sellorder}
                headCells={headCells}
                Modal={AddSellOrderModal}
                type="sellOrderId"
                DetailTableBody={SellOrderTableBody}
              />
            </Box>
          </Box>
        </Box>
      );
}
export default SellOrderBusiness;