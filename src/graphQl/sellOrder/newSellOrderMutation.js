import { gql } from "@apollo/client";


    // Khi dùng GraphQL, với những variable dạng array of objects
    // vd: $sellOrderItemDTOs: [SellOrderItemDTO]
    // Ta để kiểu là [SellOrderItemDTO] luôn, không khai báo các thuộc tính cụ thể bên trong
export const NEW_SELL_ORDER_MUTATION = gql`
  mutation newSellOrder(
    $phoneNumber: String 
    $sellOrderItemDTOs: [SellOrderItemDTO]!
    $status: Status!
  ) {
    newSellOrder(
      sellOrderInput: {
        customer: {
          phoneNumber: $phoneNumber
        }
        sellOrderItemDTOs: $sellOrderItemDTOs
        status: $status
      }
    ) 
    {
      sellOrderID
      realCost
      finalCost
    }
  }
`;
