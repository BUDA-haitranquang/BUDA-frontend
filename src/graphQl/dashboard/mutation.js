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

export const UPDATE_BUY_ORDER_STATUS = gql `
mutation (
    $buyOrderID: Int!
    $status: Status!
){
    updateBuyOrderStatus(updateStatus:{
            buyOrderID: $buyOrderID,
            status: $status
    }){
        status
    }
}`

export const UPDATE_FIXED_COST_STATUS = gql `
mutation (
    $fixedCostBillID: Int!
    $status: Status!
){
    updateFixedCostBillStatus(updateStatus:{
            fixedCostBillID: $fixedCostBillID,
            status: $status
    }){
        status
    }
}`

export const UPDATE_OTHER_COST_STATUS = gql `
mutation (
    $otherCostID: Int!
    $status: Status!
){
    updateOtherCostStatus(updateStatus:{
            otherCostID: $otherCostID,
            status: $status
    }){
        status
    }
}`