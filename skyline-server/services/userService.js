const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");

const updateUser = async (userId, userData) => {
  const { phoneNumber, fullName } = userData;
  const fieldsToUpdate = {};

  if (phoneNumber) {
    fieldsToUpdate.phoneNumber = phoneNumber;
  }
  if (fullName) {
    fieldsToUpdate.fullName = fullName;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, fieldsToUpdate, {
      runValidators: true,
      new: true,
    });

    if (!updatedUser) {
      throw new ErrorResponse(`Cannot find user with id: ${userId}`, 400);
    }
    return updatedUser;
  } catch (error) {
    console.log("catchError", error);
    if (error.name === "CastError") {
      throw new ErrorResponse(`Cannot find user with id: ${userId}`, 400);
    }
    throw new ErrorResponse(`${error.message}`, 400);
  }
};

const addFavorite = async (userId, propertyId) => {
  try {
    const user = await User.findById(userId);

    if (user.favorites.includes(propertyId)) {
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== propertyId
      );
    } else {
      user.favorites.push(propertyId);
    }
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    if (error.name === "CastError") {
      throw new ErrorResponse(
        `Cannot add favorite to list: ${propertyId}`,
        400
      );
    }
    throw new ErrorResponse(`${error.message}`, 400);
  }
};

const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    if (error.name === "CastError") {
      throw new ErrorResponse(`Cannot find user with id: ${userId}`, 400);
    }
    throw new ErrorResponse(`${error.message}`, 400);
  }
};

module.exports = {
  updateUser,
  addFavorite,
  getUser,
};
