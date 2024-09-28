import { ErrorHandler } from "../utils/error-handler.js";

import { CastErrorMessage } from "../messages/common-error-messages.js";

export const CastError = (err, req, res, next) => {
  const error = new ErrorHandler(CastErrorMessage(err.path), 400);

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
