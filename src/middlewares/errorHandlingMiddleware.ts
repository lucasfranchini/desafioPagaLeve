import IdNotFoundError from "@/errors/idNotFoundError";
import InvalidDataError from "@/errors/InvalidDataError";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

/* eslint-disable-next-line */
export default function errorHandlingMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof InvalidDataError) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
      message: err.message,
      details: err.details,
    });
  }
  if (err instanceof IdNotFoundError) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }
  /* eslint-disable-next-line no-console */
  console.error(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: "Internal Server Error!",
  });
}
