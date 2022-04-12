import { gql } from "@apollo/client";

export const LOAD_PRODUCTS = gql`
  query {
    productsByUser {
      productID
      sku: productSKU
      name
      sellingPrice
      amountLeft
      alertAmount
      costPerUnit
      description
    }
  }
`;

export const LOAD_PRODUCT = gql`
  query product($productID: Int!) {
    product(productID: $productID) {
      productID
      sku: productSKU
      name
      description
      amountLeft
      alertAmount
      costPerUnit
      sellingPrice
      picture {
        pictureLink
      }
    }
  }
`;

// Find Combo by ProductId
export const LOAD_PRODUCT_COMBO_INCLUDE_PRODUCT = gql`
  query productComboIncludeProduct($productID: Int) {
    productComboIncludeProduct(productID: $productID) {
      productComboID
      name
      description
      productComboItems {
        product {
          name
        }
      }
    }
  }
`;

// // Find Components by ProductId
export const LOAD_COMPONENTS_BY_PRODUCT = gql`
  query componentsByProduct($productID: Int) {
    componentsByProduct(productID: $productID) {
      productComponentID
      ingredient {
        ingredientSKU
        name
      }
      requiredQuantity
      totalCost
    }
  }
`;

// // Find Group by ProductId
export const LOAD_PRODUCT_GROUP_BY_PRODUCT = gql`
  query productGroupByProduct($productID: Int) {
    productGroupByProduct(productID: $productID) {
      name
    }
  }
`;
