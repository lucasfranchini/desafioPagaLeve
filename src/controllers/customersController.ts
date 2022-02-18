import { Request, Response } from "express";
import InvalidDataError from "@/errors/InvalidDataError";
import newCustomerSchema from "@/schemas/newCustomerSchema";
import httpStatus from "http-status";
import * as customersService from "@/services/customersService";

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
