import faker from "@faker-js/faker";
import { Customers, CustomerInterface } from "../../src/models/customers";

export async function createCustomerInDatabase() {
  const toolObject = createToolObject();
  const newTool = await Customers.create(toolObject);
  return newTool.toJSON();
}

export function createToolObject() {
  const newCustomer: CustomerInterface = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    birthday: faker.date.past(),
  };
  return newCustomer;
}
