import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import SupplierDetail from "./SupplierDetail/SupplierDetail";
import useStyles from "./BoxSupplier.styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

BoxSupplier.propTypes = {
  supplier: PropTypes.object,
};

function BoxSupplier(props) {
  const { supplier } = props;
  const { t } = useTranslation("buyorder", { keyPrefix: "detail.boxSupplier" });

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box className="BoxSupplier-main">
        <Box className="BoxSupplier-header">
          <Typography variant="h6">{t("title")}</Typography>
          <Box className="BoxSupplier-header-chosen-supplier">
            <AccountCircleIcon className="icon" sx={{ paddingRight: 2 }} />
            <Typography color="#08f" variant="h6">
              {supplier?.name}
            </Typography>
            <Typography variant="h6">
              &nbsp; - &nbsp;
              {supplier?.phoneNumber}
            </Typography>
          </Box>
        </Box>

        <SupplierDetail supplier={supplier} />
      </Box>
    </Paper>
  );
}

export default BoxSupplier;
