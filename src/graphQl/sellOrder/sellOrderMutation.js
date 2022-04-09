import { gql } from "@apollo/client";

export const ADD_SELL_ORDER_MUTATION = gql`
    mutation newSellOrder(
        $creationTime: String!
        $finishTime: String!
        $actualDiscountCash: Float!
        $actualDiscountPercentage: Float!
        $realCost: Float!
        $finalCost: Float!
        $userID: Int!
        $customerMessage: String!
        $status: Status!
        $textID: String!
    ){
        newSellOrder(
            sellOrderInput:{
                actualDiscountCash: $actualDiscountCash
                actualDiscountPercentage: $actualDiscountPercentage
                realCost: $realCost
                finalCost: $finalCost
                customerMessage: $customerMessage
                textID: $textID
                }
            )
            {sellOrderID}
        }
`;
