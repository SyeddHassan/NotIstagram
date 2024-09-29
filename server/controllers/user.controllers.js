import "dotenv/config";

import { User } from "../models/user.model.js";

import {
  GetProfileErrorMessage,
  InternalServerErrorMessageDuringProfileFetch,
  ProfileFetchSuccessMessage,
  UserNotFoundErrorMessage,
} from "../messages/user-controller-messages.js";

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
