const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    default: "user",
    enum: {
      values: ["user", "admin"],
      message: "Invalid user role",
    },
  },
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    maxLength: 25,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    unique: true,
    maxLength: 25,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  phoneNumber: {
    type: String,
    maxLength: 12,
  },
  favorites: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Property",
    },
  ],
  properties: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Property",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
