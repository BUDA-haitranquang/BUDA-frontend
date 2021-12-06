import React, { useEffect,useState } from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import CombinedTable from "../components/CombinedTable";
import { Toolbar } from "@mui/material";
import {useQuery} from "@apollo/client";
import { LOAD_CUSTOMERS } from "../graphQl/customers/customersQueries";
import AddCustomerModal from "../components/modal/AddCustomerModal";
import CustomerTableBody from '../components/table/body/CustomerTableBody';
const headCells = [
  // {
  //   id: "ID",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "#",
  // },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "phoneNumber",
    numeric: false,
    disablePadding: true,
    label: "Phone",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: true,
    label: "Address",
  },
  {
    id: "gender",
    numeric: false,
    disablePadding: true,
    label: "Gender",
  },
  {
    id: "ageGroup",
    numeric: false,
    disablePadding: true,
    label: "Group",
  },
  {
    id: "totalSpend",
    numeric: false,
    disablePadding: true,
    label: "Spend",
  },

];

const Customer = (props) => {
  const { window } = props;
  const [customers,setCustomers] = useState([]);
  const {error,loading,data} = useQuery(LOAD_CUSTOMERS);
  useEffect(()=>{
    if(data) setCustomers(data.customersByUser)
  },[data])

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Customer" />

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
          <CombinedTable data={customers} headCells={headCells} Modal={AddCustomerModal} Body={CustomerTableBody}/>
        </Box>
      </Box>
    </Box>
  );
};
export default Customer;
