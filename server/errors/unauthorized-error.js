import { ErrorHandler } from "../utils/error-handler.js";

import { UnauthorizedErrorMessage } from "../messages/common-error-messages.js";

export const UnauthorizedError = (err, req, res, next) => {
  const error = new ErrorHandler(UnauthorizedErrorMessage(err.message), 401);
  next(error);
};
