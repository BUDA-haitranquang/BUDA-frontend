import { gql } from "@apollo/client";

export const EDIT_PRODUCT_QUANTITY = gql`
  mutation editProductQuantity(
    $productID: Int!
    $amountLeftChange: Int!
    $message: String!
  ) {
    editProductQuantity(
      productID: $productID
      quantityLog: { amountLeftChange: $amountLeftChange, message: $message }
    ) {
      productID
    }
  }
`;
