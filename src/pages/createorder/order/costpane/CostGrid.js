import { useQuery } from "@apollo/client";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LiveSearch from "../../../../buda-components/livesearch/BudaLiveSearch";
import { LOAD_DISCOUNTS } from "../../../../graphQl/discounts/discountQueries";
import {
  addDiscount,
  calculateTotalPrice,
} from "../../../../redux/productCartSlice";
import UneditableMoneyBox from "../../common/moneybox/UneditableMoneyBox";

export default function CostGrid() {
  const dispatch = useDispatch();
  const { totalPrice } = useSelector((state) => state.productCart);
  const [chosenDiscount, setChosenDiscount] = useState(null);
  const [discounts, setDiscounts] = useState([]);
  const [calculatedDiscountValue, setCalculatedDiscountValue] = useState(0);
  // const [discountValue, setDiscountValue] = useState(0);

  const { error, loading, data } = useQuery(LOAD_DISCOUNTS);

  useEffect(() => {
    async function fetchData() {
      if (data) setDiscounts(data.discountsByUser);
    }
    fetchData();
  }, [data]);

  useEffect(() => {
    if (chosenDiscount) {
      switch (chosenDiscount.discountType) {
        case "CASH_ONLY":
          setCalculatedDiscountValue(chosenDiscount.cash);
          break;

        case "PERCENTAGE_ONLY":
          let cashLimit = chosenDiscount.cashLimit
            ? chosenDiscount.cashLimit
            : 999999999;
          let discountByPercent = chosenDiscount.percentage * totalPrice * 0.01;
          setCalculatedDiscountValue(
            discountByPercent < cashLimit ? discountByPercent : cashLimit
          );
          break;

        default:
          break;
      }
    }
  }, [chosenDiscount, totalPrice]);

  dispatch(calculateTotalPrice());

  // const changeDiscountPrice = (e) => {
  //   const tmpDiscount =
  //     totalPrice > e.target.value ? e.target.value : totalPrice;
  //   setDiscountValue(tmpDiscount);
  //   dispatch(calculateTotalDiscount(tmpDiscount));
  // };

  const onChooseDiscount = (option) => {
    setChosenDiscount(option);
    dispatch(addDiscount(option));
  };

  // useEffect(() => {}, [chosenDiscount]);

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
        <Box display="flex" flexDirection="column" width="100%">
          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography>{option?.name}</Typography>
            <Typography fontWeight="bold">{option?.discountCode}</Typography>
          </Box>
          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            {option.discountType === "CASH_ONLY" && (
              <Typography>Cash: {option?.cash}</Typography>
            )}
            {option.discountType === "PERCENTAGE_ONLY" && (
              <Box
                width="100%"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography>Percentage: {option?.percentage} %</Typography>
                {option.cashLimit ? (
                  <Typography>Cash Limit: {option.cashLimit}</Typography>
                ) : (
                  <></>
                )}
              </Box>
            )}
          </Box>
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

      <Box className="discount-box">
        <UneditableMoneyBox
          xs={4}
          title="Discount"
          // value={discountValue}
          value={calculatedDiscountValue}
          // onChange={changeDiscountPrice}
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
      </Box>

      <UneditableMoneyBox
        xs={4}
        title="Final"
        // value={totalPrice - discountValue}
        value={totalPrice - (calculatedDiscountValue || 0)}
      />
    </Grid>
  );
}
