const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const movieRoutes = require("./routes/movie-route");
app.use("/api/movies", movieRoutes);

app.get("/", (req, res) => {
  res.send(" movie watch list api is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is running on port 5000");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Connection error:", err));
