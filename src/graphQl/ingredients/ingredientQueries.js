import { gql } from "@apollo/client";

export const LOAD_INGREDIENTS = gql`
  query {
    ingredientsByUser {
      ingredientID
      name
      sku: ingredientSKU
      price
      amountLeft
      alertAmountLeft
      description
      picture {
        link: pictureLink
      }
    }
  }
`;

