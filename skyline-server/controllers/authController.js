const authService = require("../services/authService");

const register = async (req, res) => {
  const user = req.body;
  try {
    await authService.register(user);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(error.statusCode).json({ success: false, error: error.message });
  }
};

const login = async (req, res) => {
  const user = req.body;
  try {
    const loginData = await authService.login(user);
    res.status(200).cookie("auth", loginData.accessToken).json({ success: true, loginData });
  } catch (error) {
    res.status(error.statusCode).json({ success: false, error: error.message });
  }
};

module.exports = {
  register,
  login,
};
