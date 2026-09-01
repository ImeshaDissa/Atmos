const express = require("express");
const cors = require("cors");

const weatherRoutes = require("./src/routes/weatherRoutes");

const app = express();
app.use(cors());

app.use("/api", weatherRoutes);

module.exports = app;