import {useQuery } from "@apollo/client";
import { Toolbar, Tabs, Tab } from "@mui/material";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProductsStatObject from "../../components/statistics/ProductsStatsObjects";
// import { AlertErrorProp, AlertSuccessProp } from "../../buda-components/alert/BudaNoti";
import {
  PRODUCT_TOP_SELL,
  PRODUCT_LEAST_SELL,
  PRODUCT_TOP_REVENUE,
  PRODUCT_LEAST_REVENUE,
  PRODUCT_TOP_PROFIT,
  PRODUCT_LEAST_PROFIT,
  PRODUCT_TOP_RETURN_NUMBER,
  PRODUCT_TOP_RETURN_PRICE,
} from "../../graphQl/statistics/productsRankingQueries";
import Sidebar from "../../components/Sidebar";

const ProductStatistic = (props) => {
  //   const { t } = useTranslation(["common", "product"]);
  const { window } = props;
  const [value, setValue] = useState(0);
  // const [productTopSellNumber,setProductTopSellNumber] = useState([]);
  // const [productLeastSellNumber,setProductLeastSellNumber] = useState([]);
  // const [productTopRevenue,setProductTopRevenue] = useState([]);
  // const [productLeastRevenue,setProductLeastRevenue] = useState([]);
  // const [productTopProfit,setProductTopProfit] = useState([]);
  // const [productLeastProfit,setProductLeastProfit] = useState([]);
  // const [productTopReturnedNumber,setProductTopReturnedNumber] = useState([]);
  // const [productTopReturnedPrice,setProductTopReturnedPrice] = useState([]);

  // const {data: topSell} = useQuery(PRODUCT_TOP_SELL);
  // const {data: leastSell} = useQuery(PRODUCT_LEAST_SELL);
  // const {data: topRevenue} = useQuery(PRODUCT_TOP_REVENUE);
  // const {data: leastRevenue} = useQuery(PRODUCT_LEAST_REVENUE);
  // const {data: topProfit} = useQuery(PRODUCT_TOP_PROFIT);
  // const {data: leastProfit} = useQuery(PRODUCT_LEAST_PROFIT);
  // const {data: returnNumber} = useQuery(PRODUCT_TOP_RETURN_NUMBER);
  // const {data: returnPrice} = useQuery(PRODUCT_TOP_RETURN_PRICE);
  const handleChange = (e, val) => {
    setValue(val);
  };
    // useEffect(() => {
    //   async function fetchData() {
    //     if (topSell) setProductTopSellNumber(topSell.productsTopSellNumber.map((item) => item));
    //     if (leastSell) setProductLeastSellNumber(leastSell.productsLeastSellNumber.map((item) => item));
    //     if (topRevenue) setProductTopRevenue(topRevenue.productsTopRevenue.map((item) => item));
    //     if (leastRevenue) setProductLeastRevenue(leastRevenue.productsLeastRevenue.map((item) => item));
    //     if (topProfit) setProductTopProfit(topProfit.productsTopProfit.map((item) => item));
    //     if (leastProfit) setProductLeastProfit(leastProfit.productsLeastProfit.map((item) => item));
    //     if (returnNumber) setProductTopReturnedNumber(returnNumber.productsMostReturnNumber.map((item) => item));
    //     if (returnPrice) setProductTopReturnedPrice(returnPrice.productsMostReturnPrice.map((item) => item));
    //   }

    //   fetchData();
    // }, [topSell,leastSell,topRevenue,leastRevenue,topProfit,leastProfit,returnNumber,returnPrice]);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Product Statistic" id="statistic" />
      <Box>
        <Toolbar />
        <Box></Box>
        <Box sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Products Reveneu" />
            <Tab label="Products Profit" />
            <Tab label="Products Sell Number" />
            <Tab label="Returned Products" />
          </Tabs>
          {/* {value === 0 && <ProductsStatObject label ='a' data = {productTopSellNumber} dataKey = {'sellNumber'}/>} */}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductStatistic;
