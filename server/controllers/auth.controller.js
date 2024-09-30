import bcrypt from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";

import { CatchAsyncErrors } from "../middlewares/catch-async-errors.js";
import { ErrorHandler } from "../utils/error-handler.js";

import { User } from "../models/user.model.js";

import {
  AccountCreatedSuccessMessage,
  DuplicateEmailErrorMessage,
  InvalidCredentialsErrorMessage,
  LoginSuccessMessage,
  LogoutSuccessMessage,
  MissingFieldsErrorMessage,
} from "../messages/auth-controller-messages.js";

// USER REGISTRATION FUNCTION
export const RegistrationFunction = CatchAsyncErrors(async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return next(new ErrorHandler(MissingFieldsErrorMessage, 401));
    }

    const user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler(DuplicateEmailErrorMessage, 401));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: AccountCreatedSuccessMessage,
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// USER LOGIN FUNCTION
export const LoginFunction = CatchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler(MissingFieldsErrorMessage, 401));
    }

    let user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler(InvalidCredentialsErrorMessage, 401));
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler(MissingFieldsErrorMessage, 401));
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // const populatedPosts = await Promise.all(
    //   user.posts.map(async (postId) => {
    //     const post = await Post.findById(postId);
    //     if (post.author.equals(user._id)) {
    //       return post;
    //     }
    //     return null;
    //   })
    // );

    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      posts: user.posts,
    };

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      })
      .json({
        message: LoginSuccessMessage(user.username),
        success: true,
        user,
      });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// USER LOGOUT FUNCTION
export const LogoutFunction = CatchAsyncErrors(async (_, res, next) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: LogoutSuccessMessage,
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
