import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LiveSearch from "../../../../buda-components/livesearch/BudaLiveSearch";
import {
  calculateTotalDiscount,
  calculateTotalPrice,
} from "../../../../redux/productCartSlice";
import EditableMoneyBox from "../../common/moneybox/EditableMoneyBox";
import UneditableMoneyBox from "../../common/moneybox/UneditableMoneyBox";

export default function CostGrid() {
  const { totalPrice } = useSelector((state) => state.productCart);
  const [chosenDiscount, setChosenDiscount] = useState(null);
  const [discounts, setDiscounts] = useState([]);
  const [discountValue, setDiscountValue] = useState(0);
  const dispatch = useDispatch();
  dispatch(calculateTotalPrice());

  const changeDiscountPrice = (e) => {
    const tmpDiscount =
      totalPrice > e.target.value ? e.target.value : totalPrice;
    setDiscountValue(tmpDiscount);
    dispatch(calculateTotalDiscount(tmpDiscount));
  };

  const onChooseDiscount = (option) => {
    setChosenDiscount(option);
    console.table(option);
  };

  const filterDiscount = (filter) => {
    return discounts.filter((discount) => {
      let name = discount.name.toLowerCase();
      let code = discount.discountCode.toLowerCase();
      return (
        name.includes(filter.toLowerCase()) ||
        code.toLowerCase().includes(filter.toLowerCase())
      );
    });
  };

  const renderRowDiscount = (option) => {
    return (
      option && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          py={1}
        >
          <Typography>{option?.name}</Typography>
          <Typography fontWeight="bold">{option?.discountCode}</Typography>
          <Typography>{option?.cash}</Typography>
        </Box>
      )
    );
  };

  return (
    <Grid
      container
      className="costPane"
      justifyContent="space-evenly"
      sx={{ marginTop: "10px" }}
    >
      <UneditableMoneyBox xs={4} title="Total" value={totalPrice} />
      <EditableMoneyBox
        xs={4}
        title="Discount"
        value={discountValue}
        onChange={changeDiscountPrice}
      />
      <LiveSearch
        placeholder="Search Discount"
        // createable
        // textCreate="Add new Discount"
        // onClickCreate={() => setOpenCreateDiscount(true)}
        maxHeight={100}
        onChooseItem={onChooseDiscount}
        fetchData={filterDiscount}
        handleRender={renderRowDiscount}
      />
      <UneditableMoneyBox
        xs={4}
        title="Final"
        value={totalPrice - discountValue}
      />
    </Grid>
  );
}
