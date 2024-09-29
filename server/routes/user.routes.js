import express from "express";

import {
  LoginFunction,
  LogoutFunction,
  RegistrationFunction,
} from "../controllers/user.controllers.js";

const UserRouter = express.Router();

UserRouter.post("/register-user", RegistrationFunction);
UserRouter.post("/login-user", LoginFunction);
UserRouter.get("/logout-user", LogoutFunction);

export default UserRouter;
