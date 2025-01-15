const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();

const userRoutes = require("./src/routes/user.route");
const authRoutes = require("./src/routes/auth.route");
const protectedRoutes = require('./src/routes/protected.route');

const app = express();

const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors()); 

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
  app.get('/', (req, res) => {
    res.send('Welcome to the Node.js Role Management App!');
  });

// routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
