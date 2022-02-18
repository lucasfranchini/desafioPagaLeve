import { CustomerInterface, Customers } from "@/models/customers";

export async function createNewCustomer(newCustomer: CustomerInterface) {
  const createdCustomer = await Customers.create(newCustomer);
  return createdCustomer.toJSON();
}
