import { gql } from "@apollo/client";

export const NEW_SELL_ORDER  = gql`
    mutation newSellOrder(
        $customerID: Int,
        $status: Status!,
        $sellOrderItemDTOs: [SellOrderItemDTO]!,
    )
    {
        newSellOrder(
            newSellOrder: {
                customer:{
                    customerID: $customerID
                },
                status: $status,
                sellOrderItemDTOs: $sellOrderItemDTOs
            }
        )
        {
            sellOrderID
        }
    }
`;

export const DELETE_SELL_ORDER = gql`
 mutation deleteSellOrder($sellOrderID: Int){
    deleteSellOrder(sellOrderID: $sellOrderID)
 }
`