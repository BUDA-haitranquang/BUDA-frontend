import { gql } from "@apollo/client";

export const LOAD_SELL_ORDER = gql`
    query{
        sellOrdersByUser{
            sellOrderID
            actualDiscountCash
            actualDiscountPercentage
            realCost
            finalCost
            customerMessage
            textID
        }
    }
`