import React, { useEffect,useState } from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import CombinedTable from "../components/CombinedTable";
import { Toolbar } from "@mui/material";
import {useQuery} from "@apollo/client";
import { LOAD_CUSTOMERS } from "../graphQl/customers/customersQueries";
import AddCustomerModal from "../components/modal/AddCustomerModal";
import AddCostModal from "../components/modal/AddCostModal";
import CustomerTableBody from '../components/table/body/CustomerTableBody';
import CostTableBody from '../components/table/body/CostTableBody';
import { LOAD_COST } from "../graphQl/cost/costQueries";
const headCells = [
  // {
  //   id: "ID",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "#",
  // },
  {
    id: "fixedCostID",
    numeric: false,
    disablePadding: true,
    label: "fixedCostID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: true,
    label: "Description",
  },
  {
    id: "moneyAmount",
    numeric: false,
    disablePadding: true,
    label: "moneyAmount",
  },
  {
    id: "period",
    numeric: false,
    disablePadding: true,
    label: "period",
  },
  {
    id: "userID",
    numeric: false,
    disablePadding: true,
    label: "userID",
  },

];

const Cost = (props) => {
  const { window } = props;
  const [cost,setCost] = useState([]);
  //const [customers,setCustomers] = useState([]);
  //const {error,loading,data} = useQuery(LOAD_CUSTOMERS);
const {error,loading,data} = useQuery(LOAD_COST);
  useEffect(()=>{
    async function fetchData(){
      if(data) setCost(data.costsByUser)
    }
    fetchData();
    },[data])

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Cost" />

      <Box
        //mt={5}
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent = 'center'
      >
        <Toolbar />
        <Box>{}</Box>
        <Box >
          <CombinedTable 
            data={cost} 
            headCells={headCells} 
            Modal={AddCostModal} 
            Body={CostTableBody} 
            type = 'costID'/>
        </Box>
      </Box>
    </Box>
  );
};
export default Cost;
