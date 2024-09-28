import { ErrorHandler } from "../utils/error-handler.js";

import { ValidationErrorMessage } from "../messages/common-error-messages.js";

export const ValidationError = (err, req, res, next) => {
  const error = new ErrorHandler(ValidationErrorMessage(err.message), 401);
  next(error);
};
