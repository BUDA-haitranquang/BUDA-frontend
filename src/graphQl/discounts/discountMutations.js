import { gql } from "@apollo/client";

export const ADD_DISCOUNTS_MUTATION = gql`
  mutation newDiscount(
    $name: String!
    $cashLimit: Float
    $orderCount: Int
    $percentage: Float
    $cash: Float
    $expiryTime: String!
    $createdTime: String!
    $discountType : DiscountType!
  ) {
    newDiscount(
      discountInput: {
        name: $name
        cashLimit: $cashLimit
        orderCount: $orderCount
        percentage: $percentage
        cash: $cash
        expiryTime:$expiryTime
        createdTime:$createdTime  
        discountType: $discountType
      }
    ) {
      discountID
    }
  }
`;

export const DELETE_DISCOUNTS_MUTATION = gql`
  mutation 
    deleteDiscount(
        $discountID : Int!
      ){
        deleteDiscount(
          discountID : $discountID
          )
  }
`;