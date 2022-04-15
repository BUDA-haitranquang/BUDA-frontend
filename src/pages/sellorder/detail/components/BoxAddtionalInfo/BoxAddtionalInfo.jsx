import React, { useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import BudaTextField from "../../../../../buda-components/textfield/BudaTextField";
import useStyles from "./BoxAdditionalInfo.styles";
import PropTypes from "prop-types";

BoxAdditionalInfo.propTypes = {
  textID: PropTypes.string,
  creationTime: PropTypes.string,
  finishTime: PropTypes.string,
  status: PropTypes.string,
};

function BoxAdditionalInfo(props) {
  const { textID, creationTime, finishTime, status } = props;
  const classes = useStyles();
  let Time = null;
  let fTime = null;
  if(creationTime){
    Time = creationTime.slice(0,10) + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + creationTime.slice(11,19);
  }
  if(finishTime){
    fTime = finishTime.slice(0,10) + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + finishTime.slice(11,19)
  }

  return (
    <Paper className={classes.root}>
      <Box className="BoxAdditionalInfo-header">
        <Typography variant="h6">Additional Information</Typography>
      </Box>

      <Grid className="BoxAdditionalInfo-main" container spacing={2}>
        <Grid className="BoxAdditionalInfo-info" item xs={12}>
          <Typography className="BoxAdditionalInfo-info-field">
            Text ID
          </Typography>
          <Typography>{textID || "---"}</Typography>
        </Grid>

        <Grid className="BoxAdditionalInfo-info" item xs={12}>
          <Typography className="BoxAdditionalInfo-info-field">
            Status
          </Typography>
          <Typography>{status || "---"}</Typography>
        </Grid>

        <Grid className="BoxAdditionalInfo-info" item xs={12}>
          <Typography className="BoxAdditionalInfo-info-field">
            Creation time
          </Typography>
          <Typography>{Time ? Time : "--/--/----"}</Typography>
        </Grid>

        <Grid className="BoxAdditionalInfo-info" item xs={12}>
          <Typography className="BoxAdditionalInfo-info-field">
            Finish time
          </Typography>
          <Typography>{finishTime ? fTime : "--/--/----"}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default BoxAdditionalInfo;
