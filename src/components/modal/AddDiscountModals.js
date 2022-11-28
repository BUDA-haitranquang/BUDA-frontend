import { useMutation } from "@apollo/client";
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../buda-components/alert/BudaNoti";
import BudaModal from "../../buda-components/modal/BudaModal";
import { ADD_DISCOUNTS_MUTATION } from "../../graphQl/discounts/discountMutations";
import { LOAD_DISCOUNTS } from "../../graphQl/discounts/discountQueries";
import BudaDatePicker from "../../buda-components/datepicker/BudaDatePicker";

const DiscountType = {
  CASH_ONLY: "CASH_ONLY",
  PERCENTAGE_ONLY: "PERCENTAGE_ONLY",
  BOTH: "BOTH",
};

const AddDiscountModal = ({ isOpen, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [cash, setCash] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [cashLimit, setCashLimit] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [createdTime, setCreatedTime] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("0");
  const [newDiscount, { error }] = useMutation(ADD_DISCOUNTS_MUTATION);
  const [isLoading, setIsLoading] = useState(false);

  const dateToString = (date) => {
    return `${date.getFullYear()}-${
      (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1)
    }-${(date.getDate() < 10 ? "0" : "") + date.getDate()}T00:00:00Z`;
  };

  const resetForm = () => {
    setName("");
    setCash(0);
    setPercentage(0);
    setCashLimit(0);
    setOrderCount(0);
    setExpiryTime(new Date());
    setCreatedTime(new Date());
  };

  const addDiscount = () => {
    setIsLoading(true);
    newDiscount({
      variables: {
        name: name,
        cashLimit: parseFloat(cashLimit),
        orderCount: parseInt(orderCount),
        expiryTime: dateToString(expiryTime),
        createdTime: dateToString(createdTime),
        discountType:
          type === "0" ? DiscountType.PERCENTAGE_ONLY : DiscountType.CASH_ONLY,
        percentage: parseFloat(percentage),
        cash: parseFloat(cash),
      },
      refetchQueries: [{ query: LOAD_DISCOUNTS }],
    })
      .then((res) => {
        handleClose();
        enqueueSnackbar("Add new product successfully", AlertSuccessProp);
      })
      .then(resetForm())
      .catch((e) => enqueueSnackbar("An error happened", AlertErrorProp))
      .finally(setIsLoading(false));
  };

  const isFormValid = () => {
    // TODO: check định dạng (price, cost, ... phải là number)
    // + thông báo chi tiết cho từng lỗi, hiện tại đang báo chung lỗi "Invalid input"
    const isValid =
      name !== "" &&
      cash >= 0 &&
      percentage >= 0 &&
      orderCount >= 0 &&
      cashLimit >= 0 &&
      expiryTime !== "" &&
      createdTime !== "";

    return isValid;
  };

  const handleSubmit = () => {
    if (isFormValid()) addDiscount();
    else enqueueSnackbar("Invalid input", AlertErrorProp);
  };
  return (
    <BudaModal
      title="Add discount"
      open={isOpen}
      onClose={handleClose}
      textOk="Save"
      onOk={handleSubmit}
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
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* <Radio
            checked={type === 0}
            onChange={()=>{setType(0)}}
            name="radio-buttons"
            label='Discount by Percentage'
            inputProps={{ "aria-label": "A" }}
          />
          <Radio
            checked={type === 1}
            onChange={()=>{setType(1)}}
            name="radio-buttons"
            label='Discount by cash'
            inputProps={{ "aria-label": "B" }}
          /> */}
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              type === 0 ? setCash(0) : setPercentage(0);
            }}
            row
          >
            <FormControlLabel
              value={0}
              control={<Radio />}
              label="Discount by percentage"
            />
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Discount by cash"
            />
          </RadioGroup>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: "10px",
            }}
          >
            <TextField
              required
              disabled={type === "1"}
              type="number"
              id="outlined-basic"
              label="Percentage"
              variant="outlined"
              value={percentage}
              onChange={(e) => {
                setPercentage(e.target.value);
              }}
              style={{ width: "48%" }}
            />
            <TextField
              required
              disabled={type === "0"}
              type="number"
              id="outlined-basic"
              label="Cash"
              variant="outlined"
              value={cash}
              onChange={(e) => setCash(e.target.value)}
              style={{ width: "48%" }}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: "10px",
            }}
          >
            <TextField
              required
              type="number"
              id="outlined-basic"
              label="Cash limit"
              variant="outlined"
              value={cashLimit}
              onChange={(e) => setCashLimit(e.target.value)}
              style={{ width: "48%" }}
            />
            <TextField
              required
              type="number"
              id="outlined-basic"
              label="Order count"
              variant="outlined"
              value={orderCount}
              onChange={(e) => setOrderCount(e.target.value)}
              style={{ width: "48%" }}
            />
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <BudaDatePicker
              onlyDate={true}
              label="Created date"
              setValue={(val) => {
                setCreatedTime(val);
              }}
            />
            <Box px={1}></Box>
            <BudaDatePicker
              onlyDate={true}
              label="Expiry date"
              setValue={(val) => {
                setExpiryTime(val);
              }}
            />
          </div>
          {/* <TextField
            fullWidth
            id="outlined-basic"
            label="Group"
            variant="outlined"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          /> */}
          <TextField
            fullWidth
            id="outlined-basic"
            label="Description"
            variant="outlined"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
      }
    ></BudaModal>
  );
};

export default AddDiscountModal;
