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

export const UPDATE_PRODUCT_MUTATION = gql`
mutation updateProduct(
  $name: String!
  $amountLeft: Int!
  $costPerUnit: Float!
  $sellingPrice: Float!
  $description: String
){
  updateProduct(
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
`

export const HIDE_PRODUCT_MUTATION = gql`
  mutation hideProduct($productID: Int!) {
    hideProduct(productID: $productID) {
      productID
    }
  }
`;