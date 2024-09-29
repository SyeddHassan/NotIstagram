import express from "express";

import {
  LoginFunction,
  LogoutFunction,
  RegistrationFunction,
} from "../controllers/auth.controllers.js";

const AuthRouter = express.Router();

AuthRouter.post("/register-user", RegistrationFunction);
AuthRouter.post("/login-user", LoginFunction);
AuthRouter.get("/logout-user", LogoutFunction);

export default AuthRouter;
