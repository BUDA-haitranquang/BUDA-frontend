import { useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import AddCustomerModal from "../components/modal/AddCustomerModal";
import Sidebar from "../components/Sidebar";
import CustomerTableBody2 from "../components/table/body/FixedCostTableBody";
import { LOAD_CUSTOMERS } from "../graphQl/customers/customersQueries";
import CustomerTable from "../buda-components/table/CustomerTable";
const headCells =[ 
    {
        id: "name",
        numeric: false,
        disablePadding: false,
        label: "Name",
    },
    {
        id: "phoneNumber",
        numeric: false,
        disablePadding: false,
        label: "Phone Number",
    },
    {
        id: "address",
        numeric: false,
        disablePadding: false,
        label: "Address",
    },
    {
      id: "ageGroup",
      numeric: false,
      disablePadding: false,
      label: "Age Group",
  },
  {
    id: "gender",
    numeric: false,
    disablePadding: false,
    label: "Gender",
},
{
  id: "totalSpend",
  numeric: false,
  disablePadding: false,
  label: "totalSpend",
},
];

const Customer = (props) =>{
    const { window } = props;
    const [ customer,setCustomer ] = useState([]);
    const { error, loading, data } = useQuery(LOAD_CUSTOMERS);

    useEffect(() => {
        async function fetchData(){
            if(data) setCustomer(data.customersByUser);
        }
        fetchData();
        console.log(data);
    },[data]);

    if (error) return  <Redirect to="/login"/>;

    return (
        <Box sx={{ display: "flex" }}>
        <Sidebar window={window} name="Customer" />
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
            <CustomerTable
                data={customer}
                headCells={headCells}
                Modal={AddCustomerModal}
                type='customerID'
                DetailTableBody={CustomerTableBody2}
            />
            </Box>
        </Box>
        </Box>
    );
};

export default Customer;