import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import {
  PRODUCT_LEAST_PROFIT,
  PRODUCT_LEAST_REVENUE,
  PRODUCT_LEAST_SELL_NUMBER,
  PRODUCT_MOST_RETURN_NUMBER,
  PRODUCT_MOST_RETURN_PRICE,
  PRODUCT_TOP_PROFIT,
  PRODUCT_TOP_REVENUE,
  PRODUCT_TOP_SELL_NUMBER
} from "src/graphQl/statistics/productQueries";
import StatisticsCard from "./StatisticsCard";

const Retention = () => {
  const { data: productsTopSellNumber } = useQuery(PRODUCT_TOP_SELL_NUMBER);
  const { data: productsTopProfit } = useQuery(PRODUCT_TOP_PROFIT);
  const { data: productsTopRevenue } = useQuery(PRODUCT_TOP_REVENUE);
  const { data: productsLeastSellNumber } = useQuery(PRODUCT_LEAST_SELL_NUMBER);
  const { data: productsLeastRevenue } = useQuery(PRODUCT_LEAST_REVENUE);
  const { data: productsLeastProfit } = useQuery(PRODUCT_LEAST_PROFIT);
  const { data: productsMostReturnNumber } = useQuery(PRODUCT_MOST_RETURN_NUMBER);
  const { data: productsMostReturnPrice } = useQuery(PRODUCT_MOST_RETURN_PRICE);

  async function fetchData() {
  }

  useEffect(() => {
    fetchData();
  }, []);

  return <Box sx={{ display: "flex" }}>
    <StatisticsCard title={"Top Sell"}
                    data={productsTopSellNumber?.productsTopSellNumber?.map(({ name, sellNumber }) => ({
                      name, mainStats: sellNumber
                    }))}
                    sx={{ width: "30%" }}
    />
    <StatisticsCard title={"Top Revenue"}
                    data={productsTopRevenue?.productsTopRevenue?.map(({ name, revenue }) => ({
                      name, mainStats: revenue
                    }))}
                    sx={{ width: "30%" }}
    />
    <StatisticsCard title={"Top Profit"}
                    data={productsTopProfit?.productsTopProfit?.map(({ name, profit }) => ({
                      name, mainStats: profit
                    }))}
                    sx={{ width: "30%" }}
    />
  </Box>;
};

export default Retention;
