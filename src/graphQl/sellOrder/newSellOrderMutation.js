import { gql } from "@apollo/client";

export const NEW_SELL_ORDER_MUTATION = gql`
  mutation newSellOrder($sellOrderItemDTOs: [SellOrderItemDTO]) {
    newSellOrder(sellOrderInput: { sellOrderItemDTOs: $sellOrderItemDTOs }) {
      sellOrderID
      realCost
      finalCost
    }
  }
`;

export const DELETE_SELL_ORDER_MUTATION = gql`
  mutation deleteSellOrder($sellOrderID: Int!) {
    deleteSellOrder(sellOrderID: $sellOrderID)
  }
`;
