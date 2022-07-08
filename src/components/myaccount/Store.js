import { useMutation, useQuery } from "@apollo/client";
import { Toolbar, Box } from "@mui/material";
// import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import BudaTable from "../../buda-components/table/BudaTable";
import { GET_STORE } from "../../graphQl/myaccount/queries";
import StoreTableBody from "../table/body/StoreTableBody";
import NewStoreModal from '../modal/NewStoreModal';
const Stores = (props) => {
  const [stores, setStores] = useState([]);
  const { data } = useQuery(GET_STORE);

  // const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    async function fetchData() {
      if (data) setStores(data.storesByUser);
    }
    fetchData();
  }, [data]);
  const headCells = [
    {
      id: "storeID",
      numeric: false,
      disablePadding: false,
      label: "Store",
    },
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Name",
    },
    {
      id: "address",
      numeric: false,
      disablePadding: false,
      label: "Address",
    },
    // {
    //   id: "",
    //   numeric: false,
    //   disablePadding: false,
    //   label: "Edit",
    // },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        
    
        <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
          <BudaTable
            minWidth={700}
            maxRow = {[10]}
            tableName = "My Stores"
            data={stores}
            Modal = {NewStoreModal}
            headCells={headCells}
            type="storeID"
            DetailTableBody={StoreTableBody}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Stores;
