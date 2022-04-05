import { useMutation, useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import AddCustomerModal from "../components/modal/AddCustomerModal";
import Sidebar from "../components/Sidebar";
import CustomerTableBody from "../components/table/body/CustomerTableBody";
import { LOAD_CUSTOMERS } from "../graphQl/customers/customersQueries";
import BudaTable from "../buda-components/table/BudaTable";
import { HIDE_CUSTOMER_MUTATION } from "../graphQl/customers/customersMutations";
import { useSnackbar } from "notistack";
import {
    AlertErrorProp,
    AlertSuccessProp,
  } from "../buda-components/alert/BudaNoti";
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
    const [ isLoading, setIsLoading] = useState(false);
    const [ hideCustomer] = useMutation(HIDE_CUSTOMER_MUTATION);
    const { enqueueSnackbar } = useSnackbar();


    const handleDelete = (selected) => {
        if(selected === []) return;
        setIsLoading(true);
        try {
            selected.forEach((item) => {
                hideCustomer({
                    variables: { customerID: parseInt(item)},
                    refetchQueries: [{ query: LOAD_CUSTOMERS}],
                });
                
            })
            enqueueSnackbar("Delete item(s) successfully", AlertSuccessProp);
        }
        catch (e) {
                enqueueSnackbar("An error occured", AlertErrorProp);
        } 
        finally {
                setIsLoading(false);    
        }
    };

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
            <BudaTable
                deleteItems={handleDelete}
                data={customer}
                headCells={headCells}
                Modal={AddCustomerModal}
                type='customerID'
                DetailTableBody={CustomerTableBody}
            />
            </Box>
        </Box>
        </Box>
    );
};

export default Customer;