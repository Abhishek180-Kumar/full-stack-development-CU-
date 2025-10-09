// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// ===============================
// 🔗 MongoDB Connection
// ===============================
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/productDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ===============================
// 🧱 Define Product Schema & Model
// ===============================
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be negative"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
});

const Product = mongoose.model("Product", productSchema);

// ===============================
// 🧩 CRUD ROUTES
// ===============================

// 👉 Create (Add new product)
app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json({ message: "Product added successfully", data: savedProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 👉 Read (Get all products)
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👉 Update (Update product by ID)
app.put("/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product updated successfully", data: updatedProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 👉 Delete (Delete product by ID)
app.delete("/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===============================
// 🚀 Start Server
// ===============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
