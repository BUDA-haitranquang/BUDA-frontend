import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import PrimaryInfoDetail from "./PrimaryInfoDetail/PrimaryInfoDetail";
import useStyles from "./BoxPrimaryInfo.styles";
import DiscountIcon from "@mui/icons-material/Discount";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

BoxPrimaryInfo.propTypes = {
  discount: PropTypes.object,
};

function BoxPrimaryInfo(props) {
  const { discount } = props;
  const { t } = useTranslation("discount", {
    keyPrefix: "detail.boxPrimaryInfo",
  });

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box className="BoxPrimaryInfo-main">
        <Box className="BoxPrimaryInfo-header">
          <Typography variant="h6">{t("title")}</Typography>
          <Box className="BoxPrimaryInfo-header-chosen-discount">
            <DiscountIcon className="icon" sx={{ paddingRight: 2 }} />
            <Typography color="#08f" variant="h6">
              {discount?.name}
            </Typography>
          </Box>
        </Box>

        <PrimaryInfoDetail discount={discount} />
      </Box>
    </Paper>
  );
}

export default BoxPrimaryInfo;
