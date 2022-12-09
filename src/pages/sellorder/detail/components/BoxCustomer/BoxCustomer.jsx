import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import CustomerDetail from "./CustomerDetail/CustomerDetail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PropTypes from "prop-types";
import useStyles from "./BoxCustomer.styles";
BoxCustomer.propTypes = {
    customer: PropTypes.object,
};

function BoxCustomer(props){
    const { customer } = props;

   const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box className="BoxCustomer-main">
        <Box className="BoxCustomer-header">
          <Typography variant="h6">Customer detail info.</Typography>
          <Box className="BoxCustomer-header-chosen-customer">
            <AccountCircleIcon className="icon" sx={{ paddingRight: 2 }} />
            <Typography color="#08f" variant="h6">
              {customer?.name}
            </Typography>
            <Typography variant="h6">
              &nbsp; - &nbsp;
              {customer?.phoneNumber}
            </Typography>
          </Box>
        </Box>

        <CustomerDetail customer={customer} />
      </Box>
    </Paper>
  );
}

export default BoxCustomer;