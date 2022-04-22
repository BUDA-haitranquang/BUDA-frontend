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

export const LOAD_INGREDIENT = gql`
  query ingredient($ingredientID: Int!){
    ingredient(ingredientID: $ingredientID) {
      ingredientID
      sku: ingredientSKU
      name 
      description
      amountLeft
      price
      picture{
        pictureLink
      }
      alertAmountLeft
    }
  }
`
