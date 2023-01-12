const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const { connectDB } = require("./config/db.config");

const userRoutes = require("./routes/user.routes");
const stateRoutes = require("./routes/states.routes");

const app = express();
connectDB();

app.set("port", process.env.PORT || 4000);

app.use(morgan("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/states", stateRoutes);

module.exports = app;
