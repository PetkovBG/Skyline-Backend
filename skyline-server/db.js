const mongoose = require("mongoose");

const dburl = process.env.DBURL;

const connectDB = async () => {
  const connect = await mongoose.connect(dburl);

  console.log(`MongoDB Connected: ${connect.connection.host}`);
};

module.exports = connectDB;
