import { Request, Response } from "express";
import InvalidDataError from "@/errors/InvalidDataError";
import newCustomerSchema from "@/schemas/newCustomerSchema";
import httpStatus from "http-status";
import * as customersService from "@/services/customersService";
import { isValidObjectId } from "mongoose";

export async function createNewCustomer(req: Request, res: Response) {
  const newCustomer = req.body;
  const validation = newCustomerSchema.validate(newCustomer);
  if (!!validation.error) {
    throw new InvalidDataError(
      "body",
      validation.error.details.map((error) => error.message)
    );
  }
  const registeredId = await customersService.createNewCustomer(newCustomer);
  res.status(httpStatus.CREATED).send(registeredId);
}

export async function getCustomers(req: Request, res: Response) {
  const customers = await customersService.getCustomers();
  res.send(customers);
}
export async function getCustomer(req: Request, res: Response) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new InvalidDataError("id", [
      " id passed in must be a string of 12 bytes or a string of 24 hex characters",
    ]);
  }
  const customer = await customersService.getCustomer(id);
  res.send(customer);
}
export async function deleteCustomer(req: Request, res: Response) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new InvalidDataError("id", [
      " id passed in must be a string of 12 bytes or a string of 24 hex characters",
    ]);
  }
  await customersService.deleteCustomer(id);
  res.sendStatus(httpStatus.OK);
}
