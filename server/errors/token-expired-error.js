import { ErrorHandler } from "../utils/error-handler.js";

import { TokenExpiredErrorMessage } from "../messages/common-error-messages.js";

export const TokenExpiredError = (err, req, res, next) => {
  const error = new ErrorHandler(TokenExpiredErrorMessage, 400);
  next(error);
};
