import { gql } from "@apollo/client";

export const LOAD_BUY_ORDERS = gql`
  query LOAD_BUY_ORDERS {
    buyOrdersByUser {
      buyOrderID
      textID
      supplier {
        email
        name
        address
        phoneNumber
      }
      creationTime
      status
      totalCost
      staff {
        name
      }
      userID
    }
  }
`;

export const LOAD_BUY_ORDER = gql`
  query LOAD_BUY_ORDER($buyOrderID: Int) {
    buyOrder(buyOrderID: $buyOrderID) {
      buyOrderID
      textID
      supplier {
        email
        name
        address
        phoneNumber
      }
      creationTime
      finishTime
      status
      totalCost
      staff {
        name
      }
      userID
      buyOrderItems {
        ingredient {
          sku: ingredientSKU
          name
          picture {
            link: pictureLink
          }
        }
        pricePerUnit
        quantity
      }
    }
  }
`;
