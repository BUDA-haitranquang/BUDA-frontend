import { useQuery } from "@apollo/client";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddCustomerModal from "../../../../components/modal/AddCustomerModal";
import { LOAD_CUSTOMERS } from "../../../../graphQl/customers/customersQueries";
import { addCustomer } from "../../../../redux/productCartSlice";

const useStyle = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
    "& .MuiOutlinedInput-input": {
      paddingTop: "10px",
      paddingBottom: "10px",
      color: "black",
    },
  },
}));

export default function SearchCustomerBar() {
  const classes = useStyle();
  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [customers, setCustomers] = useState([]);
  const { data } = useQuery(LOAD_CUSTOMERS);
  const handleSearch = () => {};

  useEffect(() => {
    async function fetchData() {
      if (data) setCustomers(data.customersByUser);
    }

    fetchData();
  }, [data]);

  const handleAddCustomer = (value) => {
    if (value) {
      dispatch(addCustomer(value));
      setValue("");
    }
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <Box className={classes.root}>
      <Autocomplete
        id="customer-select"
        value={value}
        onChange={(event, value) => handleAddCustomer(value)}
        options={customers}
        sx={{ width: "60%" }}
        autoHighlight
        getOptionLabel={(option) => option.name || ""}
        inputValue={searchValue}
        onInputChange={(event, newInputValue, reason) => {
          if (reason === "reset") setSearchValue("");
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
          return <TextField {...params} label="Search Customer"></TextField>;
        }}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ width: "35%", padding: "2px" }}
        onClick={handleOpenModal}
      >
        NEW CUSTOMER
      </Button>
      <AddCustomerModal isOpen={isOpenModal} handleClose={handleCloseModal} />
    </Box>
  );
}
