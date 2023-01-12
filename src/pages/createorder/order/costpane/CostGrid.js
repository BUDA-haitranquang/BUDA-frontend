import { useQuery } from "@apollo/client";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import LiveSearch from "../../../../buda-components/livesearch/BudaLiveSearch";
import { LOAD_DISCOUNTS } from "../../../../graphQl/discounts/discountQueries";
import {
  addDiscount,
  calculateTotalPrice,
  deleteDiscount,
} from "../../../../redux/productCartSlice";
import UneditableMoneyBox from "../../common/moneybox/UneditableMoneyBox";

export default function CostGrid() {
  const dispatch = useDispatch();
  const { totalPrice } = useSelector((state) => state.productCart);
  const [chosenDiscount, setChosenDiscount] = useState(null);
  const [discounts, setDiscounts] = useState([]);
  const [calculatedDiscountValue, setCalculatedDiscountValue] = useState(0);
  const { t } = useTranslation(["sell"]);
  const { data } = useQuery(LOAD_DISCOUNTS);

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
    } else setCalculatedDiscountValue(0);
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
              <Typography>Cash: {option?.cash.toLocaleString()}</Typography>
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
    <Box
      display="flex"
      className="costPane"
      justifyContent="space-between"
      alignItems="baseline"
      sx={{ marginTop: "10px" }}
    >
      <LiveSearch
        placeholder={t("sell:searchDiscount")}
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
        title={t("sell:total")}
        value={totalPrice.toLocaleString()}
      />

      <Box className="discount-box">
        <UneditableMoneyBox
          xs={4}
          title={t("sell:discount")}
          // value={discountValue}
          value={calculatedDiscountValue.toLocaleString()}
          // onChange={changeDiscountPrice}
        />
        {chosenDiscount && (
          <Box
            fullWidth
            style={{
              marginTop: "5px",
              display: "flex",
              backgroundImage: "linear-gradient(to right, #277fd6, #409fff)",
              borderRadius: "8px",
              minHeight: "50px",
              paddingLeft: "5px",
              paddingRight: "5px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              color="white"
              fontFamily="'Andika', san-serif"
            >
              % {chosenDiscount?.name || ""}
            </Typography>
            <IconButton
              sx={{
                borderLeft: "2px solid rgba(255, 255, 255, 0.9)",
                borderStyle: "dashed",
                borderRadius: "0px",
                paddingLeft: "15px",
              }}
              component="span"
              onClick={() => {
                setChosenDiscount(null);
                dispatch(deleteDiscount());
              }}
            >
              <CloseIcon
                fontSize="small"
                sx={{ color: "rgba(255, 255, 255, 0.5)" }}
              />
            </IconButton>
          </Box>
        )}
        <Box pb={2}></Box>
      </Box>

      <UneditableMoneyBox
        xs={4}
        title={t("sell:final")}
        // value={totalPrice - discountValue}
        value={(totalPrice - (calculatedDiscountValue || 0)).toLocaleString()}
      />
    </Box>
  );
}
