// UNCAUGHT EXPECTATION ERROR MESSAGES
export const uncaughtExceptionMessage = (error) =>
  `Uncaught Exception occurred: ${error}`;

export const uncaughtExceptionShutdownMessage =
  "The server is shutting down due to an uncaught exception.";

// UNHANDLED PROMISE REJETION ERROR MESSAGES
export const unhandledRejectionMessage = (error) =>
  `Unhandled Promise Rejection occurred: ${error}`;

export const unhandledRejectionShutdownMessage =
  "The server is shutting down due to an unhandled promise rejection.";
