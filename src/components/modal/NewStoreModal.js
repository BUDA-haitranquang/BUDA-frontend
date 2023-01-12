import { useMutation } from "@apollo/client";
import { Box, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../buda-components/alert/BudaNoti";
import BudaModal from "../../buda-components/modal/BudaModal";
import { NEW_STORE } from "../../graphQl/myaccount/mutaion";
import { GET_STORE } from "../../graphQl/myaccount/queries";
const NewStoreModal = ({ isOpen, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState("");
  const { t } = useTranslation(["common"]);
  const [address, setAddress] = useState("");

  const [newStore] = useMutation(NEW_STORE);
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setAddress("");
  };

  const addStore = () => {
    setIsLoading(true);
    newStore({
      variables: {
        name: name,
        address: address,
      },
      refetchQueries: [{ query: GET_STORE }],
    })
      .then((res) => {
        handleClose();
        enqueueSnackbar("Add new store successfully", AlertSuccessProp);
      })
      .then(resetForm())
      .catch((e) => enqueueSnackbar("An error happened", AlertErrorProp))
      .finally(setIsLoading(false));
  };

  const isFormValid = () => {
    const isValid = name !== "" && address !== "";

    return isValid;
  };

  const handleSubmit = () => {
    isFormValid()
      ? addStore()
      : enqueueSnackbar("Invalid input", AlertErrorProp);
  };

  return (
    <BudaModal
      open={isOpen}
      onClose={handleClose}
      textOk={t("common:save")}
      onOk={handleSubmit}
      isLoading={isLoading}
      title="New Store"
      children={
        <Box
          component="form"
          autoComplete="off"
          sx={{
            width: "480px",
            "& > :not(style)": { m: 1 },
          }}
        >
          <TextField
            required
            fullWidth
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            fullWidth
            id="outlined-basic"
            label="Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Box>
      }
    />
  );
};

export default NewStoreModal;
