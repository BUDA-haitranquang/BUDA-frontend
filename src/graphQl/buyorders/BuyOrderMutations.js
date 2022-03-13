import { gql } from "@apollo/client";

export const DELETE_BUY_ORDER = gql`
  mutation deleteBuyOrder($buyOrderID: Int) {
    deleteBuyOrder(buyOrderID: $buyOrderID)
  }
`;