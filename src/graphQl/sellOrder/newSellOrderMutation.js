import { gql } from "@apollo/client";

// export const NEW_SELL_ORDER_MUTATION = gql`
//   mutation newSellOrder($sellOrderItemDTOs: [SellOrderItemDTO]) {
//     newSellOrder(sellOrderInput: { sellOrderItemDTOs: $sellOrderItemDTOs }) {
// // Khi dùng GraphQL, với những variable dạng array of objects
// // vd: $sellOrderItemDTOs: [SellOrderItemDTO]
// // Ta để kiểu là [SellOrderItemDTO] luôn, không khai báo các thuộc tính cụ thể bên trong
export const NEW_SELL_ORDER_MUTATION = gql`
  mutation newSellOrder(
    $customerID: Int
    $sellOrderItemDTOs: [SellOrderItemDTO]!
    $status: Status!
    $discountID: Int
  ) {
    newSellOrder(
      sellOrderInput: {
        customer: { customerID: $customerID }
        sellOrderItemDTOs: $sellOrderItemDTOs
        status: $status
        discountID: $discountID
      }
    ) {
      sellOrderID
      textID
      realCost
      finalCost
      creationTime
      finishTime
      realCost
      finalCost
      actualDiscountCash
      actualDiscountPercentage
      customerMessage
      status
      sellOrderItems {
        product {
          productSKU
          name
        }
        quantity
        pricePerUnit
      }
      customer {
        name
        address
        phoneNumber
      }
    }
  }
`;

export const DELETE_SELL_ORDER_MUTATION = gql`
  mutation deleteSellOrder($sellOrderID: Int!) {
    deleteSellOrder(sellOrderID: $sellOrderID)
  }
`;
