import IdNotFoundError from "@/errors/idNotFoundError";
import { UpdateCustomerInterface } from "@/interfaces/updateCustomerInterface";
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
export async function deleteCustomer(id: String) {
  const { deletedCount } = await Customers.deleteOne({ _id: id });
  if (deletedCount === 0) {
    throw new IdNotFoundError(id);
  }
}

export async function updateCustomer(
  id: String,
  updateContent: UpdateCustomerInterface
) {
  const { modifiedCount } = await Customers.updateOne(
    { _id: id },
    updateContent
  );
  if (modifiedCount === 0) {
    throw new IdNotFoundError(id);
  }
}

export async function searchCustomers(searchText: string) {
  const customers = await Customers.find({ $text: { $search: searchText } });
  return customers;
}
