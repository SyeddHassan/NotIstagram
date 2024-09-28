import { ErrorHandler } from "../utils/error-handler.js";

import { DefaultErrorMessage } from "../messages/common-error-messages.js";

export const DefaultError = (err, req, res, next) => {
  const message = err.message || DefaultErrorMessage;

  const error = new ErrorHandler(message, 500);
  next(error);
};
