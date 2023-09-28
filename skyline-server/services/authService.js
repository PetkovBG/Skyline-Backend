const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const jwtService = require("../services/jwtService");
const bcrypt = require("bcrypt");

const register = async (user) => {
  if (user.email === "" || user.password === "" || user.fullName === "") {
    throw new ErrorResponse("All fields are required.", 400);
  }

  if (user.password !== user.confirmPassword) {
    throw new ErrorResponse("Passwords must match!", 400);
  }

  if(user.password.length < 6 || user.password.length > 20) {
    throw new ErrorResponse("Password length must be between 6 and 20 characters!", 400);
  }

  // check the db if user exist
  const dbUser = await User.findOne({ email: user.email });

  if (dbUser) {
    throw new ErrorResponse(
      `User with email: ${user.email} already exists.`,
      409
    );
  }
  // hash user password before saving to db
  user.password = await hashPassword(user.password);

  try {
    await User.create(user);
  } catch (error) {
    throw new ErrorResponse(error.message, 400);
  }
};

const login = async (user) => {
  if (user.email === "" || user.password === "") {
    throw new ErrorResponse("All fields are required.", 400);
  }
  // check db if user exist
  const dbUser = await User.findOne({ email: user.email }).select("+password");
  if (!dbUser) {
    throw new ErrorResponse("Bad credentials!", 401);
  }
  // check if the incoming password match the password from the db
  const isPasswordValid = await bcrypt.compare(user.password, dbUser.password);
  if (!isPasswordValid) {
    throw new ErrorResponse("Bad credentials!", 401);
  }
  // generate new jwt token
  const token = jwtService.generateToken(dbUser);
  const loginData = {
    _id: dbUser._id,
    accessToken: token,
    userEmail: dbUser.email,
  }
  return loginData;
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports = {
  register,
  login,
};
