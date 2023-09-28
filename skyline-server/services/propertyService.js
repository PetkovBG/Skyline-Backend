const { trusted } = require("mongoose");
const Property = require("../models/Property");
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");

const saveProperty = async (property) => {
  try {
    const savedProperty = await Property.create(property);
    const user = await User.findById(property.userId);
    user.properties.push(savedProperty._id);
    await user.save();
    return savedProperty;
  } catch (error) {
    throw new ErrorResponse(error.message, 400);
  }
};

const getAllProperties = async (query = {}, page = 1) => {
  const limit = 9;
  const skip = (page - 1) * limit;
  try {
    const properties = await Property.find(query).skip(skip).limit(9);
    const totalCount = await Property.countDocuments(query);
    return { properties, totalCount };
  } catch (error) {
    throw new ErrorResponse(error.message);
  }
};

const getMostRecentProperties = async (query = {}, sortParam, limit) => {
  try {
    const properties = await Property.find(query).sort(sortParam).limit(limit);
    return properties;
  } catch (error) {
    throw new ErrorResponse(error.message);
  }
};

const getPropertyById = async (id) => {
  try {
    const property = await Property.findById(id).populate({
      path: "userId",
      select: "fullName email",
    });

    if (!property) {
      throw new ErrorResponse(`Cannot find property with id: ${id}`, 400);
    }
    // console.log('PROPERTY----', property);
    return property;
  } catch (error) {
    throw new ErrorResponse(`Cannot find property with id: ${id}`, 400);
  }
};

const updateProperty = async (id, data, userId) => {
  delete data.userId;
  try {
    const property = await Property.findById(id);

    if (!property) {
      throw new ErrorResponse(`Cannot find property with id: ${id}`, 404);
    }

    if (property.userId.toString() !== userId.toString()) {
      throw new ErrorResponse(
        `User is not authorized to edit property with id: ${id}`,
        401
      );
    }

    const updatedProperty = await Property.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    return updatedProperty;
  } catch (error) {
    if (error.name === "CastError") {
      throw new ErrorResponse(`Cannot find property with id: ${id}`, 404);
    }
    throw new ErrorResponse(`${error.message}`, error.statusCode);
  }
};

const deleteProperty = async (id, userId) => {
  try {
    const property = await Property.findById(id);
    if (!property) {
      throw new ErrorResponse(`Cannot find property with id: ${id}`, 404);
    }

    if (property.userId.toString() !== userId.toString()) {
      throw new ErrorResponse(
        `User is not authorized to delete property with id: ${id}`,
        401
      );
    }

    await Property.findByIdAndDelete(id);
    const user = await User.findById(userId);
    user.properties = user.properties.filter(
      (propertyId) => propertyId.toString() !== id.toString()
    );

    await user.save();
    await User.updateMany({ favorites: id }, { $pull: { favorites: id } });
  } catch (error) {
    if (error.name === "CastError") {
      throw new ErrorResponse(`Cannot find property with id: ${id}`, 404);
    }
    throw new ErrorResponse(error.message, error.statusCode);
  }
};

const findUserProperties = async (userId) => {
  try {
    const properties = await Property.find({ userId });
    return properties;
  } catch (error) {
    throw new ErrorResponse(error.message, error.statusCode);
  }
};

module.exports = {
  saveProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  findUserProperties,
  getMostRecentProperties,
};
