import { useQuery } from "@apollo/client";
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
  const [productTopSellNumber, setProductTopSellNumber] = useState([]);
  const [productLeastSellNumber, setProductLeastSellNumber] = useState([]);
  const [productTopRevenue, setProductTopRevenue] = useState([]);
  const [productLeastRevenue, setProductLeastRevenue] = useState([]);
  const [productTopProfit, setProductTopProfit] = useState([]);
  const [productLeastProfit, setProductLeastProfit] = useState([]);
  const [productTopReturnedNumber, setProductTopReturnedNumber] = useState([]);
  const [productTopReturnedPrice, setProductTopReturnedPrice] = useState([]);

  const { data: topSell } = useQuery(PRODUCT_TOP_SELL);
  const { data: leastSell } = useQuery(PRODUCT_LEAST_SELL);
  const { data: topRevenue } = useQuery(PRODUCT_TOP_REVENUE);
  const { data: leastRevenue } = useQuery(PRODUCT_LEAST_REVENUE);
  const { data: topProfit } = useQuery(PRODUCT_TOP_PROFIT);
  const { data: leastProfit } = useQuery(PRODUCT_LEAST_PROFIT);
  const { data: returnNumber } = useQuery(PRODUCT_TOP_RETURN_NUMBER);
  const { data: returnPrice } = useQuery(PRODUCT_TOP_RETURN_PRICE);
  const handleChange = (e, val) => {
    setValue(val);
  };
  useEffect(() => {
    async function fetchData() {
      if (topSell)
        setProductTopSellNumber(
          topSell.productsTopSellNumber.map((item) => item)
        );
      if (leastSell)
        setProductLeastSellNumber(
          leastSell.productsLeastSellNumber.map((item) => item)
        );
      if (topRevenue)
        setProductTopRevenue(topRevenue.productsTopRevenue.map((item) => item));
      if (leastRevenue)
        setProductLeastRevenue(
          leastRevenue.productsLeastRevenue.map((item) => item)
        );
      if (topProfit)
        setProductTopProfit(topProfit.productsTopProfit.map((item) => item));
      if (leastProfit)
        setProductLeastProfit(
          leastProfit.productsLeastProfit.map((item) => item)
        );
      if (returnNumber)
        setProductTopReturnedNumber(
          returnNumber.productsMostReturnNumber.map((item) => item)
        );
      if (returnPrice)
        setProductTopReturnedPrice(
          returnPrice.productsMostReturnPrice.map((item) => item)
        );
    }

    fetchData();
  }, [
    topSell,
    leastSell,
    topRevenue,
    leastRevenue,
    topProfit,
    leastProfit,
    returnNumber,
    returnPrice,
  ]);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Product Statistic" id="statistic" />
      <Box sx={{ width: "100%" }}>
        <Toolbar />
        <Box></Box>
        <Box sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Products Reveneu" />
            <Tab label="Products Profit" />
            <Tab label="Products Sell Number" />
            <Tab label="Returned Products" />
          </Tabs>
        </Box>
        <Box sx={{ width: "100%", height: "100vh" }}>
        {value === 0 && (
            <Box sx={{width:'100%',height:'100%',display:'flex',flexDirection:'column'}}>
              <ProductsStatObject
                label="Top revenue"
                data={productTopRevenue}
                dataKey={"revenue"}
                unit=""
              />
              <ProductsStatObject
                label="Least revenue"
                data={productLeastRevenue}
                dataKey={"revenue"}
                unit=""
              />
            </Box>
          )}
           {value === 1 && (
            <Box sx={{width:'100%',height:'100%',display:'flex',flexDirection:'column'}}>
              <ProductsStatObject
                label="Top profit"
                data={productTopProfit}
                dataKey={"profit"}
                unit=" sp"
              />
              <ProductsStatObject
                label="Least profit"
                data={productLeastProfit}
                dataKey={"profit"}
                unit=" "
              />
            </Box>
          )}
          {value === 2 && (
            <Box sx={{width:'100%',height:'100%',display:'flex',flexDirection:'column'}}>
              <ProductsStatObject
                label="Top sell number"
                data={productTopSellNumber}
                dataKey={"sellNumber"}
                unit=" sp"
              />
              <ProductsStatObject
                label="Least sell number"
                data={productLeastSellNumber}
                dataKey={"sellNumber"}
                unit=" sp"
              />
            </Box>
          )}
           {value === 3 && (
            <Box sx={{width:'100%',height:'100%',display:'flex',flexDirection:'column'}}>
              <ProductsStatObject
                label="Top return number"
                data={productTopReturnedNumber}
                dataKey={"returnNumber"}
                unit=" sp"
              />
              <ProductsStatObject
                label="Top return price"
                data={productLeastSellNumber}
                dataKey={"returnPrice"}
                unit=""
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductStatistic;
