import { gql } from "@apollo/client";

export const ADD_PRODUCT_MUTATION = gql`
  mutation newProduct(
    $name: String!
    $productSKU: String
    $amountLeft: Int!
    $alertAmount: Int!
    $costPerUnit: Float!
    $sellingPrice: Float!
    $description: String
    $pictureID: Int
  ) {
    newProduct(
      productInput: {
        name: $name
        productSKU: $productSKU
        amountLeft: $amountLeft
        alertAmount: $alertAmount
        costPerUnit: $costPerUnit
        sellingPrice: $sellingPrice
        description: $description
        picture: { pictureID: $pictureID }
      }
    ) {
      productID
    }
  }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation editProduct(
    $productID: Int!
    $productSKU: String
    $name: String!
    $amountLeft: Int!
    $alertAmount: Int!
    $costPerUnit: Float!
    $sellingPrice: Float!
    $description: String
  ) {
    editProduct(
      productID: $productID
      product: {
        name: $name
        productSKU: $productSKU
        amountLeft: $amountLeft
        alertAmount: $alertAmount
        costPerUnit: $costPerUnit
        sellingPrice: $sellingPrice
        description: $description
      }
    ) {
      productID
    }
  }
`;

export const HIDE_PRODUCT_MUTATION = gql`
  mutation hideProduct($productID: Int!) {
    hideProduct(productID: $productID) {
      productID
    }
  }
`;
