import { useMutation } from "@apollo/client";
import { Box, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AlertErrorProp,
  AlertSuccessProp
} from "../../buda-components/alert/BudaNoti";
import BudaModal from "../../buda-components/modal/BudaModal";
import { ADD_SUPPLIER_MUTATION } from "../../graphQl/suppliers/suppliersMutations";
import { LOAD_SUPPLIERS } from "../../graphQl/suppliers/suppliersQueries";
const AddSupplierModal = ({ isOpen, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(["common", "supplier"]);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [newSupplier, { error }] = useMutation(ADD_SUPPLIER_MUTATION);
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setPhoneNumber("");
    setAddress("");
    setEmail("");
  };

  const addSupplier = () => {
    setIsLoading(true);
    newSupplier({
      variables: {
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        email: email,
      },
      refetchQueries: [{ query: LOAD_SUPPLIERS }],
    })
      .then((res) => {
        handleClose();
        enqueueSnackbar("Add successfully", AlertSuccessProp);
      })
      .then(resetForm())
      .catch((e) => enqueueSnackbar("An error happened", AlertErrorProp))
      .finally(setIsLoading(false));
  };
  const isValid = () => {
    const valid = name !== "" && email !== "";
    return valid;
  };
  const handleSubmit = () => {
    if (isValid()) addSupplier();
    else enqueueSnackbar("Invalid input", AlertErrorProp);
  };

  return (
    <BudaModal
      open={isOpen}
      onClose={handleClose}
      textOk={t("common:save")}
      onOk={handleSubmit}
      title={t("supplier:addSupplierModal.title")}
      isLoading={isLoading}
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
            label={t("supplier:Name")}
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            fullWidth
            id="outlined-basic"
            label={t("supplier:PhoneNumber")}
            variant="outlined"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            required
            fullWidth
            id="outlined-basic"
            label={t("supplier:Address")}
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            required
            fullWidth
            id="outlined-basic"
            label={t("supplier:Email")}
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
      }
    ></BudaModal>
  );
};

export default AddSupplierModal;
