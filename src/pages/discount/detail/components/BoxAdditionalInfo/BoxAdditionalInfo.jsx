import React, { useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import BudaTextField from "../../../../../buda-components/textfield/BudaTextField";
import useStyles from "./BoxAdditionalInfo.styles";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

BoxAdditionalInfo.propTypes = {
  finishTime: PropTypes.string,
  status: PropTypes.string,
  description: PropTypes.string,
};

function BoxAdditionalInfo(props) {
  const { creationTime, finishTime, description } = props;
  const { t } = useTranslation("discount", {
    keyPrefix: "detail.boxAdditionalInfo",
  });
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box className="BoxAdditionalInfo-header">
        <Typography variant="h6">{t("title")}</Typography>
      </Box>

      <Grid className="BoxAdditionalInfo-main" container spacing={2}>
        <Grid className="BoxAdditionalInfo-info" item xs={12}>
          <Typography className="BoxAdditionalInfo-info-field">
            {t("createdAt")}
          </Typography>
          <Typography>{creationTime ? creationTime : "--/--/----"}</Typography>
        </Grid>

        <Grid className="BoxAdditionalInfo-info" item xs={12}>
          <Typography className="BoxAdditionalInfo-info-field">
            {t("finishedAt")}
          </Typography>
          <Typography>{finishTime ? finishTime : "--/--/----"}</Typography>
        </Grid>

        <Grid className="BoxAdditionalInfo-info" item xs={12}>
          <Typography className="BoxAdditionalInfo-info-field">
            {t("description")}
          </Typography>
          <Typography>{description || "---"}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default BoxAdditionalInfo;
