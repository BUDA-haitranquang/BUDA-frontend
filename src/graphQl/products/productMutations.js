import { gql } from "@apollo/client";

export const ADD_PRODUCT_MUTATION = gql`
  mutation newProduct(
    $name: String!
    $amountLeft: Int!
    $costPerUnit: Float!
    $sellingPrice: Float!
    $description: String
  ){
    newProduct(
      productInput:{
        name: $name
        amountLeft: $amountLeft
        costPerUnit: $costPerUnit
        sellingPrice: $sellingPrice
        description: $description
      }
    )
    {productID}
  }
    
`;
