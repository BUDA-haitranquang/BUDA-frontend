import { useQuery } from '@apollo/client';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, FormControl, Grid, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { LOAD_CUSTOMERS } from '../../../../graphQl/customers/customersQueries';
import { addCustomer } from '../../../../redux/productCartSlice';

const useStyle = makeStyles(() => ({
  root: {
    marginBottom: "12px",
    "& .MuiOutlinedInput-input": {
      paddingTop: "10px",
      paddingBottom: "10px",
      color: "black"
    },
  },
}));

export default function SearchCustomerBar() {
  const classes = useStyle();
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [customers, setCustomers] = useState([]);
  const {data} = useQuery(LOAD_CUSTOMERS);
  const handleSearch = () => {};

  useEffect(() => {
    async function fetchData() {
      if (data) setCustomers(data.customersByUser);
    }

    fetchData();
  }, [data]);

  const handleAddCustomer = (value) => {
    if(value){
      dispatch(addCustomer(value));
      setValue("");
    }
  }
  
  return (
    <Box className={classes.root}>
      <Autocomplete
        id="customer-select"
        value={value}
        onChange={(event, value) => handleAddCustomer(value)}
        options={customers}
        sx={{ width: "68%" }}
        autoHighlight
        getOptionLabel={(option) => option.name || ""}
        inputValue={searchValue}
        onInputChange={(event, newInputValue, reason) => {
          if(reason === "reset") setSearchValue("");
          else setSearchValue(newInputValue);
        }}
        renderOption={(props, option) => (
          <Box {...props}>
            <Grid container>
              <Grid item xs={8}>
                {option.name}
              </Grid>
            </Grid>
          </Box>
        )}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              label="Search Customer"
            ></TextField>
          );
        }}
      />
    </Box>
  );
}
