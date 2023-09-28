require("dotenv").config({
  path: "./.env",
});

const cors = require('cors');
const propertyRoutes = require("./routes/PropertyRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/userRoutes');
const connectDB = require("./db");
const corsOptions = require('./config/corsOptions');

const port = process.env.PORT || 5000;

const express = require("express");
const cookieParser = require("cookie-parser");


const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

//routes

app.use("/properties", propertyRoutes);
app.use("/auth", authRoutes);
app.use('/users', userRoutes);

connectDB();

const server = app.listen(port, () =>
  console.log(`Server running listening on port ${port}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
