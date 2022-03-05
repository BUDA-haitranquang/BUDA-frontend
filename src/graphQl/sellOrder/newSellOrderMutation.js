import { gql } from "@apollo/client";


    // Khi dùng GraphQL, với những variable dạng array of objects
    // vd: $sellOrderItemDTOs: [SellOrderItemDTO]
    // Ta để kiểu là [SellOrderItemDTO] luôn, không khai báo các thuộc tính cụ thể bên trong
export const NEW_SELL_ORDER_MUTATION = gql`
  mutation newSellOrder(
    $sellOrderItemDTOs: [SellOrderItemDTO]
  ) {
    newSellOrder(
      sellOrderInput: {
        sellOrderItemDTOs: $sellOrderItemDTOs
      }
    ) 
    {
      sellOrderID
      realCost
      finalCost
    }
  }
`;
