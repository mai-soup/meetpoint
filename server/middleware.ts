import {
  tagValidationSchema,
  userValidationSchema,
  groupValidationSchema,
  meetupValidationSchema,
} from "./validationSchemas";
import { Request, Response, NextFunction } from "express";
import { ExpressError } from "./utils/ExpressError";

export const userValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = userValidationSchema.validate(req.body);
  if (!error) return next();
  const errorMsg = error.details
    .map((i: { message: string }) => i.message)
    .join(",");
  throw new ExpressError(400, errorMsg);
};
