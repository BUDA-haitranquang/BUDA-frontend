import { gql } from "@apollo/client";

export const LOAD_SELL_ORDER = gql`
  query sellOrdersByUser(
    $page: Int
    $size: Int
    $textID: String
    $customerName: String
    $status: Status
    $from: String
    $to: String
  ) {
    sellOrdersByFilter(
      page: $page
      size: $size
      filter: {
        textID: $textID
        customerName: $customerName
        status: $status
        from: $from
        to: $to
      }
    ) {
      count
      sellOrders {
        sellOrderID
        customer {
          name
          address
          phoneNumber
          gender
        }
        discount {
          percentage
        }
        creationTime
        finishTime
        ageGroup
        gender
        actualDiscountCash
        actualDiscountPercentage
        realCost
        finalCost
        userID
        staff {
          name
        }
        customerMessage
        status
        textID
      }
    }
  }
`;

export const LOAD_SELL_ORDER_DETAILS = gql`
  query LOAD_SELL_ORDER($sellOrderID: Int) {
    sellOrder(sellOrderID: $sellOrderID) {
      sellOrderID
      customer {
        name
        address
        phoneNumber
        totalSpend
        gender
      }
      discount {
        percentage
      }
      gender
      creationTime
      finishTime
      realCost
      finalCost
      userID
      staff {
        name
      }
      customerMessage
      status
      sellOrderItems {
        product {
          sku: productSKU
          name
          picture {
            link: pictureLink
          }
          sellingPrice
          amountLeft
          description
        }
        quantity
        pricePerUnit
      }
      textID
    }
  }
`;