import fakerStatic from "faker";

const customerData = [];
for (let i = 0; i < 30; i++) {
  customerData.push({
    id: i + 1,
    name: fakerStatic.name.findName(),
    phoneNumber: fakerStatic.phone.phoneNumberFormat(),
    address: fakerStatic.address.streetAddress(),
  });
}
export default customerData;
