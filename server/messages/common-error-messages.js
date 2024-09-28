export const BadRequestErrorMessage = (errorMessage) =>
  `Bad Request: ${errorMessage}`;

export const CastErrorMessage = (resource) =>
  `Resource not found for the provided ID. Invalid ${resource}.`;

export const DefaultErrorMessage = "An unknown error has occurred.";

export const DuplicateKeyErrorMessage = (key) =>
  `A duplicate key error occurred: ${key} already exists.`;

export const InternalServerErrorMessage =
  "An internal server error has occurred.";

export const JsonWebTokenErrorMessage =
  "The provided URL is invalid. Please try again later.";

export const NotFoundErrorMessage = "The requested resource was not found.";

export const PermissionErrorMessage = (errorMessage) =>
  `Permission Denied: ${errorMessage}`;

export const TokenExpiredErrorMessage =
  "The provided URL has expired. Please try again later.";

export const UnauthorizedErrorMessage = (errorMessage) =>
  `Unauthorized Access: ${errorMessage}`;

export const ValidationErrorMessage = (errorMessage) =>
  `Validation Error: ${errorMessage}`;
