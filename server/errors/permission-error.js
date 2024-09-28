import { ErrorHandler } from "../utils/error-handler.js";

import { PermissionErrorMessage } from "../messages/common-error-messages.js";

export const PermissionError = (err, req, res, next) => {
  const error = new ErrorHandler(PermissionErrorMessage(err.message), 403);
  next(error);
};
