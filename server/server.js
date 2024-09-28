import "dotenv/config";

import { app } from "./index.js";
import ConnectDatabase from "./connections/database.js";

import {
  handleUncaughtExceptions,
  handleUnhandledRejections,
} from "./utils/app-error-handlers.js";

import { ServerConnectionStatusMessage } from "./messages/server-messages.js";

const PORT = process.env.PORT || "3000";

// HANDLED UNCAUGHT EXPECTATIONS
handleUncaughtExceptions();

// SERVER INITIALIZATION
const server = app.listen(PORT, () => {
  console.log(ServerConnectionStatusMessage(PORT));
  ConnectDatabase();
});

// HANDLED UNHANDLED PROMISE REJECTIONS
handleUnhandledRejections(server);
