import { gql } from "@apollo/client";

export const LOAD_SELL_ORDER = gql`
  query sellOrdersByUser($page: Int, $size: Int) {
    sellOrdersByUser(page: $page, size: $size) {
      sellOrderID
      customer {
          name
          address
          phoneNumber
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
`;

export const LOAD_SELL_ORDER_DETAILS = gql `
    query LOAD_SELL_ORDER($sellOrderID: Int){
        sellOrder(sellOrderID: $sellOrderID){
            sellOrderID
            customer {
                name
                address
                phoneNumber
                totalSpend
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
                    sku : productSKU
                    name 
                    picture {
                        link : pictureLink
                    }
                    sellingPrice
                    amountLeft
                    description
                }
            }
            textID
        }
    }
`;