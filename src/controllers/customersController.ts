import { Request, Response } from "express";
import InvalidDataError from "@/errors/InvalidDataError";
import newCustomerSchema from "@/schemas/newCustomerSchema";
import httpStatus from "http-status";

export async function createNewCustomer(req: Request, res: Response) {
  const newTool = req.body;
  const validation = newCustomerSchema.validate(newTool);
  if (!!validation.error) {
    throw new InvalidDataError(
      "body",
      validation.error.details.map((error) => error.message)
    );
  }
  res.status(httpStatus.CREATED);
}
