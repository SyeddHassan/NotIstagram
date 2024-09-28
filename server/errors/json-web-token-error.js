import { ErrorHandler } from "../utils/error-handler.js";

import { JsonWebTokenErrorMessage } from "../messages/common-error-messages.js";

export const JsonWebTokenError = (err, req, res, next) => {
  const error = new ErrorHandler(JsonWebTokenErrorMessage, 400);
  next(error);
};
