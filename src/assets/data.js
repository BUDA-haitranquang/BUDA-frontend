import fakerStatic from "faker";

const data = [];
for (let i = 0; i < 30; i++) {
  data.push({
    id: i + 1,
    name: fakerStatic.name.findName(),
    phoneNumber: fakerStatic.phone.phoneNumberFormat(),
    address: fakerStatic.address.streetAddress(),
  });
}
export default data;
