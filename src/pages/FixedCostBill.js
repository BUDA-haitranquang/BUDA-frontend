import { useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { LOAD_FIXED_COST_BILL } from "../graphQl/cost/fixedCostBill/fixedCostBillQueries";
import BudaTable from "../buda-components/table/BudaTable";
// import BillTable  from "../buda-components/table/FixedCostBillTable";
import AddFixedCostBillModal from "../components/modal/AddFixedCostBillModal";
import FixedCostBillTableBody from "../components/table/body/FixedCostBIllTableBody";
const headCells =[ 
    {
        id: "name",
        numeric: false,
        disablePadding: false,
        label: "Name",
    },
    {
        id: "description",
        numeric: false,
        disablePadding: false,
        label: "Description",
    },
    {
        id: "period",
        numeric: true,
        disablePadding: false,
        label: "Period",
    },
    {
        id: "moneyamount",
        numeric: true,
        disablePadding: false,
        label: "Money Amount",
    },
];

const FixCostBill = (props) =>{
    const { window } = props;
    const [ fixcosts,setFixCosts ] = useState([]);
    const { error, loading, data } = useQuery(LOAD_FIXED_COST_BILL);

    useEffect(() => {
        async function fetchData(){
            if(data) setFixCosts(data.fixedCostBillsByUser);
        }
        fetchData();
        console.log(data);
    },[data]);

    if (error) return  <Redirect to="/login"/>;

    return (
        <Box sx={{ display: "flex" }}>
        <Sidebar window={window} name="Bill Cost" />
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
                data={fixcosts}
                headCells={headCells}
                Modal={AddFixedCostBillModal}
                type='fixedCostBillID'
                DetailTableBody={FixedCostBillTableBody}
            />
            </Box>
        </Box>
        </Box>
    );
};

export default FixCostBill;