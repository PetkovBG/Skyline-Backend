const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    id: user._id.toString(),
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
  return token;
};

module.exports = {
  generateToken,
};
