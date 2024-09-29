import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import { MiddlewareError } from "./middlewares/middleware-error.js";

import UserRouter from "./routes/user.routes.js";
import AuthRouter from "./routes/auth.routes.js";
import {
  testRouteFunction,
  unknownRouteFunction,
} from "./routes/extra.routes.js";

export const app = express();
const baseURL = process.env.FRONTEND_URL || "http://localhost:5173";

// SERVER CONFIGURATIONS
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: baseURL,
    credentials: true,
  })
);

// ROUTES
app.use("/api/v1", AuthRouter, UserRouter);

// BASIC ROUTES
app.get("/", testRouteFunction);
app.all("*", unknownRouteFunction);

// BAISC APP ERROR HANDLING
app.use(MiddlewareError);
