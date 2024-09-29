import bcrypt from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";

import {
  AccountCreatedSuccessMessage,
  DuplicateEmailErrorMessage,
  GetProfileErrorMessage,
  InternalServerErrorMessageDuringLogin,
  InternalServerErrorMessageDuringLogout,
  InternalServerErrorMessageDuringProfileFetch,
  InternalServerErrorMessageDuringRegistration,
  InvalidCredentialsErrorMessage,
  LoginErrorMessage,
  LoginSuccessMessage,
  LogoutErrorMessage,
  LogoutSuccessMessage,
  MissingFieldsErrorMessage,
  ProfileFetchSuccessMessage,
  RegistrationErrorMessage,
  UserNotFoundErrorMessage,
} from "../messages/user-controller-messages.js";

// USER REGISTRATION FUNCTION
export const RegistrationFunction = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({
        message: MissingFieldsErrorMessage,
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: DuplicateEmailErrorMessage,
        success: false,
      });
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
    console.error(RegistrationErrorMessage(error));

    return res.status(500).json({
      message: InternalServerErrorMessageDuringRegistration,
      success: false,
    });
  }
};

// USER LOGIN FUNCTION
export const LoginFunction = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: MissingFieldsErrorMessage,
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: InvalidCredentialsErrorMessage,
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: InvalidCredentialsErrorMessage,
        success: false,
      });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
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
    console.error(LoginErrorMessage(error));
    return res.status(500).json({
      message: InternalServerErrorMessageDuringLogin,
      success: false,
    });
  }
};

// USER LOGOUT FUNCTION
export const LogoutFunction = async (_, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: LogoutSuccessMessage,
      success: true,
    });
  } catch (error) {
    console.error(LogoutErrorMessage(error));
    return res.status(500).json({
      message: InternalServerErrorMessageDuringLogout,
      success: false,
    });
  }
};

// USER GET PROFILE FUNCTION
export const GetProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId)
      .populate({ path: "posts", createdAt: -1 })
      .populate("bookmarks");

    if (!user) {
      return res.status(404).json({
        message: UserNotFoundErrorMessage,
        success: false,
      });
    }

    return res.status(200).json({
      message: ProfileFetchSuccessMessage,
      success: true,
      user,
    });
  } catch (error) {
    console.log(GetProfileErrorMessage(error));
    return res.status(500).json({
      message: InternalServerErrorMessageDuringProfileFetch,
      success: false,
    });
  }
};
