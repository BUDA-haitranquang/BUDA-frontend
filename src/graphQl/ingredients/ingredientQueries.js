import { gql } from "@apollo/client";

export const LOAD_INGREDIENTS = gql`
  query {
    ingredientsByUser {
      ingredientID
      name
      price
      amountLeft
      alertAmountLeft
      description
    }
  }
`;

export const LOAD_INGREDIENT = gql`
  query ingredient($ingredientID: Int!){
    ingredient(ingredientID: $ingredientID) {
      ingredientID
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
