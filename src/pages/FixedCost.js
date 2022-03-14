import { useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import AddFixedCostModal from "../components/modal/AddFixedCostModal";
import Sidebar from "../components/Sidebar";
import FixedCostTableBody from "../components/table/body/FixedCostTableBody";
import { LOAD_FIXED_COST } from "../graphQl/cost/fixedCost/fixedCostQueries";
import FixedCostTable from "../buda-components/table/FixedCostTable";
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

const FixCost = (props) =>{
    const { window } = props;
    const [ fixcosts,setFixCosts ] = useState([]);
    const { error, loading, data } = useQuery(LOAD_FIXED_COST);

    useEffect(() => {
        async function fetchData(){
            if(data) setFixCosts(data.fixedCostsByUser);
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
            <FixedCostTable
                data={fixcosts}
                headCells={headCells}
                Modal={AddFixedCostModal}
                type='fixedCostID'
                DetailTableBody={FixedCostTableBody}
            />
            </Box>
        </Box>
        </Box>
    );
};

export default FixCost;