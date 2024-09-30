import express from "express";

import isAuthenticated from "../middlewares/authentication.js";

import {
  EditProfileFunction,
  GetProfileFuntion,
  GetSuggestedUsersFunction,
} from "../controllers/user.controllers.js";

const UserRouter = express.Router();

UserRouter.get("/profile/:id", isAuthenticated, GetProfileFuntion);

UserRouter.post("/profile/edit", isAuthenticated, EditProfileFunction);

UserRouter.post("/suggested", isAuthenticated, GetSuggestedUsersFunction);

export default UserRouter;
