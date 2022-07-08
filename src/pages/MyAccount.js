import { useMutation, useQuery } from "@apollo/client";
import { Toolbar, Grid, Box } from "@mui/material";

import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../buda-components/alert/BudaNoti";
import Profile from "../components/myaccount/Profile";
import Stores from "../components/myaccount/Store"
const MyAccount = (props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        width="100%"
        sx={{paddingLeft:'10px'}}
        // display="flex"
        // flexDirection="column"
        // alignItems="center"
        // justifyContent="center"
      >
        <Toolbar />
      
        <Grid container spacing = {2} >
          <Grid item xs={3}>
            <Profile />
          </Grid>
          <Grid item xs alignItems='center' justifyContent='center' display='flex'>
            <Box sx ={{width:'100%'}}>
            <Stores/>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default MyAccount;
