const propertyService = require("../services/propertyService");

const saveProperty = async (req, res) => {
  try {
    const property = req.body;
    console.log("PROPERTY", property);
    const userId = req.user._id;
    property.userId = userId;
    const savedProperty = await propertyService.saveProperty(property);
    res.status(201).json({ success: true, data: savedProperty });
  } catch (error) {
    res.status(error.statusCode).json({ success: false, error: error.message });
  }
};

const getAllProperties = async (req, res) => {
  const { status, bedrooms, price, type, city } = req.query;
  const page = req.query.page ? Number(req.query.page) : 1;
  let query = {};

  if (type) {
    query.type = type;
  }

  if (city) {
    // query["location.city"] = city;
    //make search case insensitive with RegEx
    query["location.city"] = { $regex: new RegExp(city, "i") };
  }

  if (status) {
    query.status = status;
  }

  if (bedrooms) {
    query.bedrooms = Number(bedrooms);
  }

  if (price) {
    query.price = { $lte: Number(price) };
  }

  try {
    const { properties, totalCount } = await propertyService.getAllProperties(
      query,
      page
    );
    res.status(200).json({
      success: true,
      totalCount,
      count: properties.length,
      page,
      data: properties,
    });
  } catch (error) {
    res.status(error.statusCode).json({ success: false, error: error.message });
  }
};

const getMostRecentProperties = async (req, res) => {
  let sort = { listingCreation: -1 };
  let limit = 3;
  const { status } = req.query;
  let query = {};
  if (status) {
    query.status = status;
  }

  try {
    const properties = await propertyService.getMostRecentProperties(
      query,
      sort,
      limit
    );
    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    res.statis(error.statusCode).json({ success: false, error: error.message });
  }
};

const getPropertyById = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await propertyService.getPropertyById(id);
    res.status(200).json({ success: true, data: property });
  } catch (error) {
    res.status(error.statusCode).json({ success: false, error: error.message });
  }
};

const updateProperty = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const userId = req.user._id;
  console.log("DATA", data);
  try {
    const updatedProperty = await propertyService.updateProperty(
      id,
      data,
      userId
    );
    res.status(200).json({ success: true, data: updatedProperty });
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ success: false, error: error.message, status: error.statusCode });
  }
};

const deleteProperty = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    await propertyService.deleteProperty(id, userId);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(error.statusCode).json({ success: false, error: error.message });
  }
};

const findUserProperties = async (req, res) => {
  const userId = req.user._id;
  try {
    const userProperties = await propertyService.findUserProperties(userId);
    res.status(200).json({ success: true, data: userProperties });
  } catch (error) {
    res.status(error.statusCode).json({ success: false, error: error.message });
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
