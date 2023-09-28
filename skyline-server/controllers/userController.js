const userService = require("../services/userService");

const updateUser = async (req, res) => {
  const id = req.user._id;
  const { data } = req.body;

  try {
    const updatedUser = await userService.updateUser(id, data);
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(error.statusCode).json({ success: false, error: error.message });
  }
};

const addFavorite = async (req, res) => {
  const id = req.user._id;
  const {propertyId} = req.body;
  try {
    const updatedUser = await userService.addFavorite(id, propertyId);
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(error.statusCode).json({ success: false, error: error.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getUser(id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(error.statusCode).json({ success: false, error: error.message });
  }
};

module.exports = {
  updateUser,
  addFavorite,
  getUser,
};
