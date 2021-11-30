import { gql } from "@apollo/client";

export const LOAD_PRODUCTS = gql`
  query {
    productsByUser {
      name
      sellingPrice
      amountLeft
      alertAmount
      costPerUnit
      description
    }
  }
`;

export const HIDE_PRODUCT = gql`
  query hideProduct(
    $productID: Int!
  ){
    hideProduct(
      productID: $productID
    ){productID}
  }
  
`
