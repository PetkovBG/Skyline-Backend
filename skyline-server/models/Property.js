const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    maxLength: 40,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    maxLength: 300,
  },
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  location: {
    address: {
      type: String,
      required: [true, "Location is required"],
      maxLength: 40,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      maxLength: 25,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      maxLength: 25,
    },
    zipcode: {
      type: String,
      required: [true, "Zipcode is required"],
      maxlength: 8,
    },
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: 0,
  },
  area: {
    type: Number,
    required: [true, "Area is required"],
    min: 0,
    max: 8000,
  },
  bedrooms: {
    type: Number,
    min: 0,
    max: 10,
  },
  bathrooms: {
    type: Number,
    min: 0,
    max: 10,
  },
  images: [
    {
      type: String,
      required:  [true, "Image is required"],
    },
  ],
  features: [
    {
      type: String,
    },
  ],
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: {
      values: ["for-rent", "for-sale", "rented", "sold", "inactive"],
      message: "Status is required",
    },
  },
  listingCreation: {
    type: Date,
    default: Date.now(),
  },
  listingExpiration: {
    type: Date,
    default: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
