// server.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const studentRoutes = require("./routes/studentRoutes");

const app = express();
app.use(express.json());

// =======================
// MongoDB Connection
// =======================
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studentDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// =======================
// Routes
// =======================
app.use("/students", studentRoutes);

// =======================
// Server Start
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
