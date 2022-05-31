import { gql } from "@apollo/client";

export const LOAD_BUY_ORDERS = gql`
  query LOAD_BUY_ORDERS(
    $page: Int
    $size: Int
    $textID: String
    $supplierName: String
    $status: Status
    $from: String
    $to: String
  ) {
    buyOrdersByFilter(
      page: $page
      size: $size
      filter: {
        textID: $textID
        supplierName: $supplierName
        status: $status
        from: $from
        to: $to
      }
    ) {
      count
      buyOrders {
        buyOrderID
        textID
        supplier {
          email
          name
          address
          phoneNumber
        }
        createdAt: creationTime
        status
        totalCost
        staff {
          name
        }
        userID
      }
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
