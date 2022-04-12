import { gql } from "@apollo/client";

export const LOAD_SELL_ORDER = gql`
  query sellOrdersByUser($page: Int, $size: Int) {
    sellOrdersByUser(page: $page, size: $size) {
      sellOrderID
      textID
      customer {
        name
      }
      finalCost
      creationTime
      finishTime
      status
    }
  }
`;
