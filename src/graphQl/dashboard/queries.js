import { gql } from "@apollo/client";

export const INCOMPLETED_SELL_ORDER = gql`
  query {
    incompletedSellOrdersByUser {
      sellOrderID
      customer {
        name
      }
      finalCost
      creationTime
      textID
    }
  }
`;

export const INCOMPLETED_BUY_ORDER = gql`
  query{
    incompletedBuyOrdersByUser{
      buyOrderID
      supplier{
        name
      }
      status
      creationTime
      totalCost
      textID
    }
  }`

  export const INCOMPLETED_FIXED_COST = gql`
  query{
    incompletedFixedCostBillsByUser{
      fixedCostBillID
      creationTime
      dueTime
      status
      totalSpend
    }
  }`

  export const INCOMPLETED_OTHER_COST = gql`
  query{
    incompletedOtherCostsByUser{
      otherCostID
      creationTime
      name
      status
      totalCost
    }
  }`