import jwt from "jsonwebtoken";

import { CatchAsyncErrors } from "./catch-async-errors.js";
import { ErrorHandler } from "../utils/error-handler.js";

import {
  AuthenticationMessage,
  InvalidAccessTokenErrorMessage,
} from "../messages/authentiation-middleware-message.js";

const isAuthenticated = CatchAsyncErrors(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(new ErrorHandler(AuthenticationMessage, 401));
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return next(new ErrorHandler(AuthenticationMessage, 401));
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    return next(new ErrorHandler(InvalidAccessTokenErrorMessage, 401));
  }
});

export default isAuthenticated;
