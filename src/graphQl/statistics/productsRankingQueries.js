import { gql } from "@apollo/client";

export const PRODUCT_TOP_SELL = gql`
  query {
    productsTopSellNumber {
      productID
      name
      sellNumber
    }
  }
`;

export const PRODUCT_LEAST_SELL = gql`
  query {
    productsLeastSellNumber {
      productID
      name
      sellNumber
    }
  }
`;

export const PRODUCT_TOP_RETURN_NUMBER = gql`
query{
    productsMostReturnNumber{
        productID
        name
        returnNumber
    }
}`

export const PRODUCT_TOP_RETURN_PRICE = gql`
query{
    productsMostReturnPrice{
        productID
        name
        returnPrice
    }
}`

export const PRODUCT_TOP_REVENUE = gql`
query{
    productsTopRevenue{
        productID
        name
        revenue
    }
}`

export const PRODUCT_LEAST_REVENUE = gql`
query{
    productsLeastRevenue{
        productID
        name
        revenue
    }
}`

export const PRODUCT_TOP_PROFIT = gql`
query {
    productsTopProfit{
        productID
        name 
        profit
    }
}`

export const PRODUCT_LEAST_PROFIT = gql`
query {
    productsLeastProfit{
        productID
        name 
        profit
    }
}`