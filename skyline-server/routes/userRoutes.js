const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

router.put("/like", protect, userController.addFavorite);
router.put("/update", protect, userController.updateUser);
router.get("/:id", protect, userController.getUser);

module.exports = router;
