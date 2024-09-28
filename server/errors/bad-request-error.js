import { ErrorHandler } from "../utils/error-handler.js";

import { BadRequestErrorMessage } from "../messages/common-error-messages.js";

export const BadRequestError = (err, req, res, next) => {
  const error = new ErrorHandler(BadRequestErrorMessage(err.message), 400);
  next(error);
};
