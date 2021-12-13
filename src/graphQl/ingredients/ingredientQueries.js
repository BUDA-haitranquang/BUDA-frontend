import { gql } from "@apollo/client";

export const LOAD_INGREDIENTS = gql`
  query {
    ingredientsByUser {
      name
      price
      amountLeft
      alertAmountLeft
      description
    }
  }
`;

