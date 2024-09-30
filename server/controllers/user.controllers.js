import "dotenv/config";

import { CatchAsyncErrors } from "../middlewares/catch-async-errors.js";
import { ErrorHandler } from "../utils/error-handler.js";
import getDataUri from "../utils/get-data-uri.js";

import cloudinary from "../connections/cloudinary.js";

import { User } from "../models/user.model.js";

import {
  NoSuggestedUsersMessage,
  ProfileFetchSuccessMessage,
  ProfileUpdateSuccessMessage,
  UserNotFoundErrorMessage,
} from "../messages/user-controller-messages.js";

// USER GET PROFILE FUNCTION
export const GetProfileFuntion = CatchAsyncErrors(async (req, res, next) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId)
      .populate({ path: "posts", createdAt: -1 })
      .populate("bookmarks");

    if (!user) {
      return next(new ErrorHandler(UserNotFoundErrorMessage, 404));
    }

    return res.status(200).json({
      message: ProfileFetchSuccessMessage,
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// USER EDIT PROFILE FUNCTION
export const EditProfileFunction = CatchAsyncErrors(async (req, res, next) => {
  try {
    const userId = req.id;
    const { bio, gender } = req.body;
    const profilePicture = req.file;
    let cloudResponse;

    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri, {
        folder: "NotInstagram Profile Pictures",
        width: 500,
        crop: "scale",
      });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return next(new ErrorHandler(UserNotFoundErrorMessage, 404));
    }

    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (profilePicture) user.profilePicture = cloudResponse.secure_url;

    await user.save();

    return res.status(200).json({
      message: ProfileUpdateSuccessMessage,
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// GET SUGGESTED USERS FUNCTION
export const GetSuggestedUsersFunction = CatchAsyncErrors(
  async (req, res, next) => {
    try {
      const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select(
        "-password"
      );
      if (!suggestedUsers) {
        return next(new ErrorHandler(NoSuggestedUsersMessage, 400));
      }

      return res.status(200).json({
        success: true,
        users: suggestedUsers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);