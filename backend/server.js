const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MONGO_URL } = require("./config");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("DB ERROR:", err));

app.use("/api/user", userRoutes); // FIXED ROUTE

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
