import { Box, Grid, Paper, Typography } from "@mui/material";
import useStyles from "src/pages/sellorder/detail/components/BoxAddtionalInfo/BoxAdditionalInfo.styles";
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
          <Typography>{creationTime ? creationTime : "--/--/----"}</Typography>
        </Grid>

        <Grid className="BoxAdditionalInfo-info" item xs={12}>
          <Typography className="BoxAdditionalInfo-info-field">
            Finish time
          </Typography>
          <Typography>{finishTime ? finishTime : "--/--/----"}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default BoxAdditionalInfo;
