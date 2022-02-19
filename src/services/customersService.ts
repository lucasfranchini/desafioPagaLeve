import IdNotFoundError from "@/errors/idNotFoundError";
import { CustomerInterface, Customers } from "@/models/customers";

export async function createNewCustomer(newCustomer: CustomerInterface) {
  const createdCustomer = await Customers.create(newCustomer);
  return createdCustomer.toJSON();
}
export async function getCustomers() {
  const customers = await Customers.find();
  return customers;
}
export async function getCustomer(id: String) {
  const customer = await Customers.findById(id);
  if (!customer) {
    throw new IdNotFoundError(id);
  }
  return customer;
}
