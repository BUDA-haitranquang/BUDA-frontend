import fakerStatic from "faker";

var prodData = [];
for (let i = 0; i < 100; i++) {
  prodData.push({
    id: i + 1,
    name: fakerStatic.commerce.productName(),
    price: fakerStatic.commerce.price(),
    amount: fakerStatic.datatype.number(),
    cost: fakerStatic.commerce.price(),
    category: fakerStatic.finance.transactionType(),
    description: fakerStatic.commerce.productDescription(),
  });
}
export const productData = prodData;
