import { ErrorHandler } from "../utils/error-handler.js";

import { InternalServerErrorMessage } from "../messages/common-error-messages.js";

export const InternalServerError = (err, req, res, next) => {
  const error = new ErrorHandler(InternalServerErrorMessage, 500);
  next(error);
};
