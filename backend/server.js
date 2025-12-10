const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MONGO_URL } = require("./config");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

async function connectDB() {
  try {
    console.log("Connecting to Mongo DB.....");
    await mongoose.connect(MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("Mongo DB conncted successfulyy  machan...");
  } catch (err) {
    console.log("Mongo DB connection failed", err.message);
  }
}
connectDB();
//   mongoose
//     .connect(MONGO_URL)
//     .then(() =>
//       console.log(
//         "MongoDB connected successfully,Let rock it baby..............."
//       )
//     )
//     .catch((err) => console.log("DB ERROR:", err));
// }

app.use("/api/user", userRoutes);

// Use the port assigned by Render, fallback to 5000 for local
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
