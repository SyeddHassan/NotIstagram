import { ErrorHandler } from "../utils/error-handler.js";

import { NotFoundErrorMessage } from "../messages/common-error-messages.js";

export const NotFoundError = (err, req, res, next) => {
  const error = new ErrorHandler(NotFoundErrorMessage, 404);
  next(error);
};
