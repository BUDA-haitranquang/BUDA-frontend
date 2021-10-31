import fakerStatic from "faker";

const productData = [];
for (let i = 0; i < 100; i++) {
  productData.push({
    id: i + 1,
    name: fakerStatic.commerce.productName(),
    price: fakerStatic.commerce.price(),
    amount: fakerStatic.datatype.number(),
    cost: fakerStatic.commerce.price(),
    category: fakerStatic.finance.transactionType(),
    description: fakerStatic.commerce.productDescription(),
  });
}
export default productData;
