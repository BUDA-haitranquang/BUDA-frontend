import { gql } from "@apollo/client";

export const LOAD_PRODUCTS = gql`
  query {
    productsByUser {
      productID
      name
      sellingPrice
      amountLeft
      alertAmount
      costPerUnit
      description
    }
  }
`;

export const LOAD_PRODUCT = gql`
  query product($productID: Int!) {
    product(productID: $productID) {
      productID
      name
      description
      amountLeft
      alertAmount
      costPerUnit
      sellingPrice
      picture{
        pictureLink
      }
    }
  }
`;


