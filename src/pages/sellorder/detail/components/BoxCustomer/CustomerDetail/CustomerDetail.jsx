import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";
import useStyles from "./CustomerDetail.styles";

CustomerDetail.propTypes = {
    customer: PropTypes.object,
  };

function CustomerDetail(props) {
    const { customer } = props;
    const classes = useStyles()
    // { console.log(customer)};
  
    return customer ? (
      <Grid container spacing={2}>
        <Grid className={classes.root}  item xs={12} md={4}>
          <Box className="CustomerDetail-info">
            <Typography className="CustomerDetail-info-field">Address</Typography>
            <Typography>{customer.address || ""}</Typography>
          </Box>
  
          <Box className="CustomerDetail-info">
            <Typography className="CustomerDetail-info-field">Total Spend</Typography>
            <Typography>{customer.totalSpend || ""}</Typography>
          </Box>
        </Grid>
      </Grid>
    ) : (
      <></>
    );
  }
  
  export default CustomerDetail;