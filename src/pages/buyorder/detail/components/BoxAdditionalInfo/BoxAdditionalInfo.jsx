import { Box, Grid, Paper, Typography } from "@mui/material";
import useStyles from "./BoxAdditionalInfo.styles";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

BoxAdditionalInfo.propTypes = {
  textID: PropTypes.string,
  creationTime: PropTypes.string,
  finishTime: PropTypes.string,
  status: PropTypes.string,
};

function BoxAdditionalInfo(props) {
  const { textID, creationTime, finishTime, status } = props;
  const { t } = useTranslation("buyorder", {
    keyPrefix: "detail.boxAdditionalInfo",
  });
  const classes = useStyles();
  let cTime = null;
  let fTime = null;
  if (creationTime) {
    cTime = creationTime.slice(0, 10) + creationTime.slice(11, 19);
  }
  if (finishTime) {
    fTime = finishTime.slice(0, 10) + finishTime.slice(11, 19);
  }
  return (
    <Paper className={classes.root}>
      <Box className="BoxAdditionalInfo-header">
        <Typography variant="h6">{t("title")}</Typography>
      </Box>

      <Grid className="BoxAdditionalInfo-main" container spacing={2}>
        <Grid className="BoxAdditionalInfo-info" item xs={12}>
          <Typography className="BoxAdditionalInfo-info-field">
            {t("textId")}
          </Typography>
          <Typography>{textID || "---"}</Typography>
        </Grid>

        <Grid className="BoxAdditionalInfo-info" item xs={12}>
          <Typography className="BoxAdditionalInfo-info-field">
            {t("status")}
          </Typography>
          <Typography>{status || "---"}</Typography>
        </Grid>

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
      </Grid>
    </Paper>
  );
}

export default BoxAdditionalInfo;
