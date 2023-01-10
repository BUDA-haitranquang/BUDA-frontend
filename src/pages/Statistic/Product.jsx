import { useQuery } from "@apollo/client";
import PaidIcon from "@mui/icons-material/Paid";
import SellIcon from "@mui/icons-material/Sell";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import {
  PRODUCT_LEAST_PROFIT,
  PRODUCT_LEAST_REVENUE,
  PRODUCT_LEAST_SELL_NUMBER,
  PRODUCT_MOST_RETURN_NUMBER,
  PRODUCT_MOST_RETURN_PRICE,
  PRODUCT_TOP_PROFIT,
  PRODUCT_TOP_REVENUE,
  PRODUCT_TOP_SELL_NUMBER,
} from "src/graphQl/statistics/productQueries";
import StatisticsCard from "./StatisticsCard";

const Retention = () => {
  const { data: productsTopSellNumber } = useQuery(PRODUCT_TOP_SELL_NUMBER);
  const { data: productsTopProfit } = useQuery(PRODUCT_TOP_PROFIT);
  const { data: productsTopRevenue } = useQuery(PRODUCT_TOP_REVENUE);
  const { data: productsLeastSellNumber } = useQuery(PRODUCT_LEAST_SELL_NUMBER);
  const { data: productsLeastRevenue } = useQuery(PRODUCT_LEAST_REVENUE);
  const { data: productsLeastProfit } = useQuery(PRODUCT_LEAST_PROFIT);
  const { data: productsMostReturnNumber } = useQuery(
    PRODUCT_MOST_RETURN_NUMBER
  );
  const { data: productsMostReturnPrice } = useQuery(PRODUCT_MOST_RETURN_PRICE);

  async function fetchData() {}

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={8} md={4}>
        <StatisticsCard
          title={"Top Sell"}
          data={productsTopSellNumber?.productsTopSellNumber?.map(
            ({ name, sellNumber }) => ({
              name,
              mainStats: sellNumber,
            })
          )}
          sx={{ width: "30%" }}
          type="success"
          icon={<TrendingUpIcon color="success" />}
        />
      </Grid>
      <Grid item xs={8} md={4}>
        <StatisticsCard
          title={"Top Revenue"}
          data={productsTopRevenue?.productsTopRevenue?.map(
            ({ name, revenue }) => ({
              name,
              mainStats: revenue,
            })
          )}
          sx={{ width: "30%" }}
          type="success"
          icon={<SellIcon color="success" />}
        />
      </Grid>

      <Grid item xs={8} md={4}>
        <StatisticsCard
          title={"Top Profit"}
          data={productsTopProfit?.productsTopProfit?.map(
            ({ name, profit }) => ({
              name,
              mainStats: profit,
            })
          )}
          sx={{ width: "30%" }}
          type="success"
          icon={<PaidIcon color="success" />}
        />
      </Grid>

      <Grid item xs={8} md={4}>
        <StatisticsCard
          title={"Most Returned"}
          data={productsMostReturnNumber?.productsMostReturnNumber?.map(
            ({ name, returnNumber }) => ({
              name,
              mainStats: returnNumber,
            })
          )}
          sx={{ width: "30%" }}
          type="error"
          icon={<TrendingDownIcon color="error" />}
        />
      </Grid>
      <Grid item xs={8} md={4}>
        <StatisticsCard
          title={"Least Revenue"}
          data={productsLeastRevenue?.productsLeastRevenue?.map(
            ({ name, revenue }) => ({
              name,
              mainStats: revenue,
            })
          )}
          sx={{ width: "30%" }}
          type="error"
          icon={<SellIcon color="error" />}
        />
      </Grid>

      <Grid item xs={8} md={4}>
        <StatisticsCard
          title={"Least Profit"}
          data={productsLeastProfit?.productsTopProfit?.map(
            ({ name, profit }) => ({
              name,
              mainStats: profit,
            })
          )}
          sx={{ width: "30%" }}
          type="error"
          icon={<PaidIcon color="error" />}
        />
      </Grid>
    </Grid>
  );
};

export default Retention;
