import { gql } from "@apollo/client";

export const NEW_BUY_ORDER = gql `
  mutation newBuyOrder(
    $supplierID: Int,
    $status: Status!,
    $buyOrderItemDTOs: [BuyOrderItemDTO]!  
  ) {
    newBuyOrder(
      newBuyOrder: {
        supplier: {
          supplierID: $supplierID
        },
        status: $status,
        buyOrderItemDTOs: $buyOrderItemDTOs
      }
    ) {
        buyOrderID
    }
  }
`;

export const DELETE_BUY_ORDER = gql`
  mutation deleteBuyOrder($buyOrderID: Int) {
    deleteBuyOrder(buyOrderID: $buyOrderID)
  }
`;