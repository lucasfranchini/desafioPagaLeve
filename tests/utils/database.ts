import "../../src/setup";
import mongoose from "mongoose";
import { Customers } from "../../src/models/customers";

export async function clearDatabase() {
  await Customers.deleteMany();
}

export async function endConnection() {
  await mongoose.disconnect();
}
