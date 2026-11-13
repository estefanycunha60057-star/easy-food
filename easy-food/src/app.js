const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./modules/auth/auth.routes");
const restaurantRoutes = require("./modules/restaurant/restaurant.routes");
const dishRoutes = require("./modules/dishes/dish.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(process.cwd(), "public")));
app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

app.use("/auth", authRoutes);
app.use("/restaurants", restaurantRoutes);
app.use(dishRoutes);

app.use(errorHandler);

module.exports = app;