import { ErrorHandler } from "../utils/error-handler.js";

import { CastError } from "../errors/cast-error.js";
import { DuplicateKeyError } from "../errors/duplicate-key-error.js";
import { JsonWebTokenError } from "../errors/json-web-token-error.js";
import { TokenExpiredError } from "../errors/token-expired-error.js";
import { ValidationError } from "../errors/validation-error.js";
import { NotFoundError } from "../errors/not-found-error.js";
import { UnauthorizedError } from "../errors/unauthorized-error.js";
import { InternalServerError } from "../errors/internal-server-error.js";
import { BadRequestError } from "../errors/bad-request-error.js";
import { PermissionError } from "../errors/permission-error.js";
import { DefaultError } from "../errors/default-error.js";

export const MiddlewareError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  console.error(err);

  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else if (err.name === "CastError") {
    CastError(err, req, res, next);
  } else if (err.code === 11000) {
    DuplicateKeyError(err, req, res, next);
  } else if (err.name === "JsonWebTokenError") {
    JsonWebTokenError(err, req, res, next);
  } else if (err.name === "TokenExpiredError") {
    TokenExpiredError(err, req, res, next);
  } else if (err.name === "ValidationError") {
    ValidationError(err, req, res, next);
  } else if (err.name === "NotFoundError") {
    NotFoundError(err, req, res, next);
  } else if (err.name === "UnauthorizedError") {
    UnauthorizedError(err, req, res, next);
  } else if (err.name === "InternalServerError") {
    InternalServerError(err, req, res, next);
  } else if (err.name === "BadRequestError") {
    BadRequestError(err, req, res, next);
  } else if (err.name === "PermissionError") {
    PermissionError(err, req, res, next);
  } else {
    DefaultError(err, req, res, next);
  }
};
