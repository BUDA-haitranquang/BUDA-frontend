import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Toolbar, Tabs, Tab,Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";

const Business = (props) => {
    const { window } = props;
    const [currentTab, setCurrentTab] = useState(0);
    const handleChange = (e, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <Box sx={{display: "flex"}}>
            <Sidebar window={window} name="Business"/>
            <Box sx={{width: '100%'}}>
                <Toolbar />
                <Box pt={1}>
                    <Tabs value={currentTab} onChange={handleChange}>
                        <Tab label="Sell Order" />
                        <Tab label="Something"/>
                    </Tabs>
                </Box>
            </Box>
        </Box>
    )
}

export default Business;