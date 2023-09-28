const express = require("express");
const propertyController = require("../controllers/PropertyController");
const router = express.Router();

const { protect } = require('../middlewares/authMiddleware');

router.post("/", protect, propertyController.saveProperty);
router.get("/", propertyController.getAllProperties);
router.get("/my-properties", protect, propertyController.findUserProperties);
router.get('/recents', propertyController.getMostRecentProperties)
router.get("/:id", propertyController.getPropertyById);
router.put("/:id", protect, propertyController.updateProperty);
router.delete("/:id", protect, propertyController.deleteProperty);

module.exports = router;
