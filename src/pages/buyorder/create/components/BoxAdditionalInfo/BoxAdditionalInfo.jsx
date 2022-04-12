import React, { useContext, useState } from "react";
import { Autocomplete, Box, Paper, TextField, Typography } from "@mui/material";
import BudaTextField from "../../../../../buda-components/textfield/BudaTextField";
import useStyles from "./BoxAdditionalInfo.styles";
import { CreateBuyOrderContext } from "../../context/CreateBuyOrderContext";
import { buyOrderStatuses } from "../../../constant/BuyOrderStatus";

function BoxAdditionalInfo(props) {
  const [note, setNote] = useState("");
  const [buyOrderCode, setBuyOrderCode] = useState("");
  const [status, setStatus] = useState("");

  const { setBuyOrderRequest } = useContext(CreateBuyOrderContext);

  const classes = useStyles();

  const handleCodeChange = (e) => {
    const textId = e.target.value || "";
    setBuyOrderCode(textId);
    setBuyOrderRequest((prevBuyOrderRequest) => ({
      ...prevBuyOrderRequest,
      // textID: textId,
    }));
  };

  const handleNoteChange = (e) => {
    const note = e.target.value || "";
    setNote(note);
    setBuyOrderRequest((prevBuyOrderRequest) => ({
      ...prevBuyOrderRequest,
      // textID: textId,
    }));
  };

  const handleStatusChange = (e, status) => {
    setStatus(status.label);
    setBuyOrderRequest((prevBuyOrderRequest) => ({
      ...prevBuyOrderRequest,
      status: status.label,
    }));
  };

  return (
    <Paper className={classes.root}>
      <Box className="BoxAdditionalInfo-header">
        <Typography variant="h6">Additional Information</Typography>
      </Box>

      <Box className="BoxAdditionalInfo-main">
        <BudaTextField
          label="Text ID:"
          value={buyOrderCode}
          onChange={(e) => handleCodeChange(e)}
          textFieldHeight={40}
          otherProps={{
            mb: 2,
          }}
        />
        <BudaTextField
          label="Note:"
          value={note}
          onChange={(e) => handleNoteChange(e)}
          textFieldHeight={40}
          otherProps={{
            mb: 2,
          }}
        />
        <Box mb={2}>
          <Typography mb={1}>Status:</Typography>
          <Autocomplete
            disablePortal
            disableClearable
            defaultValue="FINISHED"
            options={buyOrderStatuses}
            sx={{ width: "100%", height: "60px" }}
            renderInput={(params) => <TextField {...params} />}
            onChange={(e, value) => handleStatusChange(e, value)}
          />
        </Box>
      </Box>
    </Paper>
  );
}

export default BoxAdditionalInfo;
