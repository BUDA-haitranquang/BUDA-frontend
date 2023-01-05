import { useMutation } from "@apollo/client";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AlertErrorProp,
  AlertSuccessProp
} from "../../buda-components/alert/BudaNoti";
import BudaModal from "../../buda-components/modal/BudaModal";
import { ADD_CUSTOMER_MUTATION } from "../../graphQl/customers/customersMutations";
import { LOAD_CUSTOMERS } from "../../graphQl/customers/customersQueries";

const AddCustomerModal = ({ isOpen, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t }  = useTranslation(["common","customer"]);
  
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [totalSpend, setTotalSpend] = useState(0.0);
  const [gender, setGender] = useState("UNKNOWN");
  const [ageGroup, setAgeGroup] = useState("UNKNOWN");
  const [newCustomer, { error }] = useMutation(ADD_CUSTOMER_MUTATION);
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setPhoneNumber("");
    setTotalSpend(0);
    setAddress("");
  };
  
  const addCustomer = () => {
    setIsLoading(true);
    newCustomer({
      variables: {
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        totalSpend: parseFloat(totalSpend),
        gender: gender,
        ageGroup: ageGroup,
      },
      refetchQueries: [{ query: LOAD_CUSTOMERS }],
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
    return name.length > 0;
  };

  const handleSubmit = () => {
    if (isValid()) addCustomer();
    else enqueueSnackbar("Invalid input", AlertErrorProp);
  };
  return (
    <BudaModal
      open={isOpen}
      onClose={handleClose}
      textOk={t("common:save")}
      title={t("customer:Modal.title")}
      onOk={handleSubmit}
      isLoading={isLoading}
      children={
        <Box
          component="form"
          autoComplete="off"
          sx={{
            width: "480px",
            height: "400px",
            "& > :not(style)": { m: 1 },
          }}
        >
          <TextField
            required
            fullWidth
            id="outlined-basic"
            label={t("customer:customerName")}
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              type="number"
              id="outlined-basic"
              label={t("customer:totalSpend")}
              variant="outlined"
              value={totalSpend.toLocaleString()}
              onChange={(e) => setTotalSpend(e.target.value)}
              style={{ width: "48%" }}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label={t("customer:phoneNumber")}
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{ width: "48%" }}
            />
          </div>
          <TextField
            fullWidth
            id="outlined-basic"
            label={t("customer:address")}
            multiline
            rows="3"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <FormControl style={{ width: "48%" }}>
              <InputLabel>{t("customer:gender")}</InputLabel>
              <Select
                value={gender}
                label={t("customer:gender")}
                onChange={(e) => setGender(e.target.value)}
                fullWidth
              >
                <MenuItem value={"UNKNOWN"}>{t("customer:Modal.gender.unknown")}</MenuItem>
                <MenuItem value={"MALE"}>{t("customer:Modal.gender.male")}</MenuItem>
                <MenuItem value={"FEMALE"}>{t("customer:Modal.gender.female")}</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={{ width: "48%" }}>
              <InputLabel>{t("customer:ageGroup")}</InputLabel>
              <Select
                value={ageGroup}
                label={t("customer:customerName")}
                onChange={(e) => setAgeGroup(e.target.value)}
                fullWidth
              >
                <MenuItem value={"UNKNOWN"}>{t("customer:Modal.ageGroup.unknown")}</MenuItem>
                <MenuItem value={"FROM_0_TO_12"}>{t("customer:Modal.ageGroup.group1")}</MenuItem>
                <MenuItem value={"FROM_12_TO_18"}>{t("customer:Modal.ageGroup.group2")}</MenuItem>
                <MenuItem value={"FROM_18_TO_24"}>{t("customer:Modal.ageGroup.group3")}</MenuItem>
                <MenuItem value={"FROM_24_TO_30"}>{t("customer:Modal.ageGroup.group4")}</MenuItem>
                <MenuItem value={"FROM_30_TO_40"}>{t("customer:Modal.ageGroup.group5")}</MenuItem>
                <MenuItem value={"FROM_40_TO_50"}>{t("customer:Modal.ageGroup.group6")}</MenuItem>
                <MenuItem value={"FROM_50_TO_65"}>{t("customer:Modal.ageGroup.group7")}</MenuItem>
                <MenuItem value={"FROM_65_AND_ABOVE"}>
                {t("customer:Modal.ageGroup.group8")}
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>
      }
    ></BudaModal>
  );
};
export default AddCustomerModal;
