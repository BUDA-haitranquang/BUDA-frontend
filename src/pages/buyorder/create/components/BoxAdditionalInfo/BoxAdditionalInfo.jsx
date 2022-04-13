import React, { useContext, useEffect, useState } from "react";
import { Autocomplete, Box, Paper, TextField, Typography } from "@mui/material";
import BudaTextField from "../../../../../buda-components/textfield/BudaTextField";
import useStyles from "./BoxAdditionalInfo.styles";
import { CreateBuyOrderContext } from "../../context/CreateBuyOrderContext";
import { buyOrderStatuses } from "../../../constant/BuyOrderStatus";

function BoxAdditionalInfo(props) {
  const defaultStatus = "FINISHED";

  const [description, setDescription] = useState("");
  const [textId, setTextId] = useState("");
  const [status, setStatus] = useState(defaultStatus);

  const { setBuyOrderRequest } = useContext(CreateBuyOrderContext);

  const classes = useStyles();

  useEffect(() => {
    setBuyOrderRequest((prevBuyOrderRequest) => ({
      ...prevBuyOrderRequest,
      // textID: textId,
      // description: description,
      status: status,
    }));
  }, [textId, description, status]);

  const handleTextIdChange = (value) => {
    const textId = value || "";
    setTextId(textId);
  };

  const handleDescriptionChange = (value) => {
    const note = value || "";
    setDescription(note);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus.label);
  };

  return (
    <Paper className={classes.root}>
      <Box className="BoxAdditionalInfo-header">
        <Typography variant="h6">Additional Information</Typography>
      </Box>

      <Box className="BoxAdditionalInfo-main">
        <BudaTextField
          label="Text ID:"
          value={textId}
          onChange={handleTextIdChange}
          textFieldHeight={40}
          otherProps={{
            mb: 2,
          }}
        />
        <BudaTextField
          label="Description:"
          value={description}
          onChange={handleDescriptionChange}
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
            defaultValue={defaultStatus}
            options={buyOrderStatuses}
            sx={{ width: "100%", height: "60px" }}
            renderInput={(params) => <TextField {...params} />}
            onChange={(e, value) => handleStatusChange(value)}
          />
        </Box>
      </Box>
    </Paper>
  );
}

export default BoxAdditionalInfo;
