import { useQuery } from "@apollo/client";
import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddCustomerModal from "../../../../components/modal/AddCustomerModal";
import { LOAD_CUSTOMERS } from "../../../../graphQl/customers/customersQueries";
import { addCustomer } from "../../../../redux/productCartSlice";
import { useTranslation } from "react-i18next";
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
  const {t} = useTranslation(['sell']);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [customers, setCustomers] = useState([]);
  const { data } = useQuery(LOAD_CUSTOMERS);

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
        getOptionLabel={(option) => option.name + option.phoneNumber || ""}
        inputValue={searchValue}
        onInputChange={(event, newInputValue, reason) => {
          if (reason === "reset") setSearchValue("");
          else setSearchValue(newInputValue);
        }}
        renderOption={(props, option) => (
          <Box
            {...props}
            style={{ width: "100%", borderBottom: "1px solid #e1dede" }}
          >
            <Grid>
              <Typography>{option.name}</Typography>
              <Typography style={{ opacity: 0.6 }}>
                {option.phoneNumber}
              </Typography>
            </Grid>
          </Box>
        )}
        renderInput={(params) => {
          return (
            <TextField {...params} label={t("sell:searchCustomer")}></TextField>
          );
        }}
      />
      <Button
        variant="contained"
        sx={{
          width: "37%",
          padding: "2px",
          backgroundImage: "linear-gradient(to right, #277fd6, #409fff)",
        }}
        onClick={handleOpenModal}
      >
        {t("sell:newCustomer")}
      </Button>
      <AddCustomerModal isOpen={isOpenModal} handleClose={handleCloseModal} />
    </Box>
  );
}
