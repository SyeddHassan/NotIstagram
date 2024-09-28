import {
  uncaughtExceptionMessage,
  uncaughtExceptionShutdownMessage,
  unhandledRejectionMessage,
  unhandledRejectionShutdownMessage,
} from "../messages/app-error-handlers-messages.js";

// Function to handle uncaught exceptions
export const handleUncaughtExceptions = () => {
  process.on("uncaughtException", (err) => {
    console.error(uncaughtExceptionMessage(err.message));
    console.error(uncaughtExceptionShutdownMessage);
    process.exit(1);
  });
};

// Function to handle unhandled promise rejections
export const handleUnhandledRejections = (server) => {
  process.on("unhandledRejection", (err) => {
    console.error(unhandledRejectionMessage(err.message));
    console.error(unhandledRejectionShutdownMessage);

    server.close(() => {
      process.exit(1);
    });
  });
};
