import faker from "@faker-js/faker";
import { Customers, CustomerInterface } from "../../src/models/customers";

export async function createCustomerInDatabase() {
  const customerObject = createCustomerObject();
  const newCustomer = await Customers.create(customerObject);
  return newCustomer.toJSON();
}

export function createCustomerObject() {
  const newCustomer: CustomerInterface = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    birthday: faker.date.past(),
  };
  return newCustomer;
}
