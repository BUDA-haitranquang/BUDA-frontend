import React, { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import LiveSearch from "../../../../../buda-components/livesearch/BudaLiveSearch";
import AddSupplierModal from "../../../../../components/modal/AddSupplierModal";
import SupplierDetail from "./SupplierDetail/SupplierDetail";
import useStyles from "./BoxSupplier.styles";
import { useQuery } from "@apollo/client";
import { LOAD_SUPPLIERS } from "../../../../../graphQl/suppliers/suppliersQueries";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

function BoxSupplier(props) {
  const [openCreateSupplier, setOpenCreateSupplier] = useState(false);
  const [chosenSupplier, setChosenSupplier] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const { data } = useQuery(LOAD_SUPPLIERS);

  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      if (data) {
        setSuppliers(data.suppliersByUser);
      }
    }
    fetchData();
  }, [data]);

  const filterSupplier = (filter) => {
    return suppliers.filter((supplier) => {
      let name = supplier.name.toLowerCase();
      let phoneNumber = supplier.phoneNumber.toLowerCase();
      return (
        name.includes(filter.toLowerCase()) ||
        phoneNumber.toLowerCase().includes(filter.toLowerCase())
      );
    });
  };

  const renderRowSupplier = (option) => {
    return (
      option && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          py={1}
        >
          <Typography>{option.name}</Typography>
          <Typography fontWeight="bold">{option.phoneNumber}</Typography>
        </Box>
      )
    );
  };

  const onChooseSupplier = (option) => {
    setChosenSupplier(option);
  };

  return (
    <Paper className={classes.root}>
      <Box className="BoxSupplier-main">
        <Box className="BoxSupplier-header">
          <Typography variant="h6">Supplier detail info.</Typography>
          {!chosenSupplier ? (
            <LiveSearch
              placeholder="Search for a supplier"
              createable
              textCreate="Add a new supplier"
              onClickCreate={() => setOpenCreateSupplier(true)}
              maxHeight={300}
              onChooseItem={onChooseSupplier}
              fetchData={filterSupplier}
              handleRender={renderRowSupplier}
            />
          ) : (
            <Box className="BoxSupplier-header-chosen-supplier">
              <AccountCircleIcon sx={{ paddingRight: 2 }} />
              <Typography color="#08f" variant="h6">
                {chosenSupplier.name}
              </Typography>
              <Typography variant="h6">
                &nbsp; - &nbsp;
                {chosenSupplier.phoneNumber}
              </Typography>
              <CancelOutlinedIcon
                sx={{ paddingLeft: 2, cursor: "pointer" }}
                onClick={() => setChosenSupplier(null)}
              />
            </Box>
          )}
        </Box>

        <SupplierDetail supplier={chosenSupplier} />

        <AddSupplierModal
          isOpen={openCreateSupplier}
          handleClose={() => setOpenCreateSupplier(false)}
        />
      </Box>
    </Paper>
  );
}

export default BoxSupplier;
