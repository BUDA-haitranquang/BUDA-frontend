import { gql } from "@apollo/client";

export const LOAD_DISCOUNTS = gql`
  query {
    discountsByUser {
      discountID
      name
      percentage
      cash
      cashLimit
      orderCount
      expiryTime
      createdTime
      discountCode
      discountType
    }
  }
`;

export const LOAD_DISCOUNT = gql`
  query ($discountID: Int) {
    discount(discountID: $discountID) {
      discountID
      discountCode
      name
      description
      cash
      percentage
      cashLimit
      orderCount
      createdTime
      expiryTime
      discountType
    }
  }
`;
