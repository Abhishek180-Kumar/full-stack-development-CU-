const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ Connection Error:", err));

const variantSchema = new mongoose.Schema({
  color: String,
  size: String,
  stock: Number,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  variants: [variantSchema],
});

const Product = mongoose.model("Product", productSchema);

async function run() {
  await Product.deleteMany();

  await Product.insertMany([
    {
      name: "T-Shirt",
      price: 799,
      category: "Clothing",
      variants: [
        { color: "Red", size: "M", stock: 25 },
        { color: "Blue", size: "L", stock: 12 },
      ],
    },
    {
      name: "Smartphone",
      price: 24999,
      category: "Electronics",
      variants: [
        { color: "Black", size: "128GB", stock: 15 },
        { color: "Silver", size: "256GB", stock: 8 },
      ],
    },
  ]);

  console.log("✅ Products inserted");

  console.log("\n📦 All Products:");
  console.log(await Product.find());

  console.log("\n🎯 Electronics Products:");
  console.log(await Product.find({ category: "Electronics" }));

  console.log("\n🎨 Project Only Name & Variant Colors:");
  console.log(await Product.find({}, { name: 1, "variants.color": 1, _id: 0 }));

  mongoose.connection.close();
}

run();
