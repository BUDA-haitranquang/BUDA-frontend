import { gql } from "@apollo/client";

export const LOAD_COLALTION = gql`
  query {
    productsByUser {
      productID
      name
      amountLeft
      productLeftLogs{
          amountLeftChange
      }  
    }
  }
`;
