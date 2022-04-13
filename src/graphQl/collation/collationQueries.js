import { gql } from "@apollo/client";

export const LOAD_COLATIONS = gql`
  query {
    productsByUser {
      productID
      name
      productSKU
      amountLeft
      groupID  
    }
  }
`;
