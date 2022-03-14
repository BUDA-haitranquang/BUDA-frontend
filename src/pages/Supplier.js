import { useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import AddSupplierModal from "../components/modal/AddSupplierModal";
import SupplierTableBody from "../components/table/body/SupplierTableBody";
import SupplierTable from "../buda-components/table/SupplierTable";
import { LOAD_SUPPLIERS } from "../graphQl/suppliers/suppliersQueries";
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
        numeric: true,
        disablePadding: false,
        label: "Address",
    },
    {
        id: "email",
        numeric: true,
        disablePadding: false,
        label: "Email",
    },
];

const FixCost = (props) =>{
    const { window } = props;
    const [ supplier,setSupplier ] = useState([]);
    const { error, loading, data } = useQuery(LOAD_SUPPLIERS);

    useEffect(() => {
        async function fetchData(){
            if(data) setSupplier(data.suppliersByUser);
        }
        fetchData();
        console.log(data);
    },[data]);

    if (error) return  <Redirect to="/login"/>;

    return (
        <Box sx={{ display: "flex" }}>
        <Sidebar window={window} name="Cost" />
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
            <SupplierTable
                data={supplier}
                headCells={headCells}
                Modal={AddSupplierModal}
                type='fixedCostID'
                DetailTableBody={SupplierTableBody}
            />
            </Box>
        </Box>
        </Box>
    );
};

export default FixCost;