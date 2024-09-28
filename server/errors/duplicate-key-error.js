import { ErrorHandler } from "../utils/error-handler.js";

import { DuplicateKeyErrorMessage } from "../messages/common-error-messages.js";

export const DuplicateKeyError = (err, req, res, next) => {
  const error = new ErrorHandler(
    DuplicateKeyErrorMessage(Object.keys(err.keyValue)[0]),
    400
  );
  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
