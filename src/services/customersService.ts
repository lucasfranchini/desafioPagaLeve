import { CustomerInterface, Customers } from "@/models/customers";

export async function createNewCustomer(newCustomer: CustomerInterface) {
  const createdCustomer = await Customers.create(newCustomer);
  return createdCustomer.toJSON();
}
export async function getCustomers() {
  const customers = await Customers.find();
  return customers;
}
