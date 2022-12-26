import { gql } from "@apollo/client";

export const PRODUCT_TOP_SELL_NUMBER = gql`
  query {
    productsTopSellNumber {
      productID,
      name,
      sellNumber,
      revenue,
      profit,
      returnNumber
    }
  }
`;

export const PRODUCT_TOP_PROFIT = gql`
  query {
    productsTopProfit {
      productID,
      name,
      sellNumber,
      revenue,
      profit,
      returnNumber
    }
  }
`;

export const PRODUCT_TOP_REVENUE = gql`
  query {
    productsTopRevenue {
      productID,
      name,
      sellNumber,
      revenue,
      profit,
      returnNumber
    }
  }
`;

export const PRODUCT_LEAST_SELL_NUMBER = gql`
  query {
    productsLeastSellNumber {
      productID,
      name,
      sellNumber,
      revenue,
      profit,
      returnNumber
    }
  }
`;

export const PRODUCT_LEAST_REVENUE = gql`
  query {
    productsLeastRevenue {
      productID,
      name,
      sellNumber,
      revenue,
      profit,
      returnNumber
    }
  }
`;

export const PRODUCT_LEAST_PROFIT = gql`
  query {
    productsLeastProfit {
      productID,
      name,
      sellNumber,
      revenue,
      profit,
      returnNumber
    }
  }
`;

export const PRODUCT_MOST_RETURN_PRICE = gql`
  query {
    productsMostReturnPrice {
      productID,
      name,
      sellNumber,
      revenue,
      profit,
      returnNumber
    }
  }
`;

export const PRODUCT_MOST_RETURN_NUMBER = gql`
  query {
    productsMostReturnNumber {
      productID,
      name,
      sellNumber,
      revenue,
      profit,
      returnNumber
    }
  }
`;
