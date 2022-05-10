import { gql } from "@apollo/client";

export const FINISH_SELL_ORDER = gql`
mutation finishSellOrder( $sellOrderID: Int! ){
    finishSellOrder(
        sellOrderID : $sellOrderID
    )
    {
        status
    }
}`

export const CANCEL_SELL_ORDER = gql`
mutation cancelSellOrder( $sellOrderID: Int! ){
    cancelSellOrder(
        sellOrderID : $sellOrderID
    )
    {
        status
    }
}`