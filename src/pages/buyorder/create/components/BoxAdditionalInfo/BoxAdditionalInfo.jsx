import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import BudaTextField from "../../../../../buda-components/textfield/BudaTextField";
import useStyles from "./BoxAdditionalInfo.styles";

function BoxAdditionalInfo(props) {
  const [note, setNote] = useState(null);
  const [buyOrderCode, setBuyOrderCode] = useState(null);

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box className="BoxAdditionalInfo-header">
        <Typography variant="h6">Additional Information</Typography>
      </Box>

      <Box className="BoxAdditionalInfo-main">
        <BudaTextField
          label="Text ID:"
          value={buyOrderCode}
          onChange={setBuyOrderCode}
          textFieldHeight={40}
          otherProps={{
            mb: 2,
          }}
        />
        <BudaTextField
          label="Note:"
          value={note}
          onChange={setNote}
          textFieldHeight={40}
          otherProps={{
            mb: 2,
          }}
        />
      </Box>
    </Paper>
  );
}

export default BoxAdditionalInfo;
