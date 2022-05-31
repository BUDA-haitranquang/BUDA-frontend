import React, { useContext, useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import LiveSearch from "../../../../../buda-components/livesearch/BudaLiveSearch";
import AddSupplierModal from "../../../../../components/modal/AddSupplierModal";
import SupplierDetail from "./SupplierDetail/SupplierDetail";
import useStyles from "./BoxSupplier.styles";
import { useQuery } from "@apollo/client";
import { LOAD_SUPPLIERS } from "../../../../../graphQl/suppliers/suppliersQueries";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { CreateBuyOrderContext } from "../../context/CreateBuyOrderContext";
import { useTranslation } from "react-i18next";

function BoxSupplier(props) {
  const { t } = useTranslation("buyorder", { keyPrefix: "create.boxSupplier" });
  const [openCreateSupplier, setOpenCreateSupplier] = useState(false);
  const [chosenSupplier, setChosenSupplier] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const { data } = useQuery(LOAD_SUPPLIERS);

  const { setBuyOrderRequest } = useContext(CreateBuyOrderContext);

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
    setBuyOrderRequest((prevBuyOrderRequest) => ({
      ...prevBuyOrderRequest,
      supplier: option,
    }));
  };

  return (
    <Paper className={classes.root}>
      <Box className="BoxSupplier-main">
        <Box className="BoxSupplier-header">
          <Typography variant="h6">{t("title")}</Typography>
          {!chosenSupplier ? (
            <LiveSearch
              placeholder={t("placeholder")}
              createable
              textCreate={t("buttonCreate")}
              onClickCreate={() => setOpenCreateSupplier(true)}
              maxHeight={150}
              onChooseItem={onChooseSupplier}
              fetchData={filterSupplier}
              handleRender={renderRowSupplier}
            />
          ) : (
            <Box className="BoxSupplier-header-chosen-supplier">
              <AccountCircleIcon className="icon" sx={{ paddingRight: 2 }} />
              <Typography color="#08f" variant="h6">
                {chosenSupplier.name}
              </Typography>
              <Typography variant="h6">
                &nbsp; - &nbsp;
                {chosenSupplier.phoneNumber}
              </Typography>
              <CancelOutlinedIcon
                className="icon"
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
