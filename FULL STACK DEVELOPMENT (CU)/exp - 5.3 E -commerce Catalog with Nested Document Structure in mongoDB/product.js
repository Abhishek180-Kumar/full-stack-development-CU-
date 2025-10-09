db.products.insertMany([
  {
    name: "T-Shirt",
    price: 799,
    category: "Clothing",
    variants: [
      { color: "Red", size: "M", stock: 25 },
      { color: "Blue", size: "L", stock: 12 },
      { color: "Black", size: "S", stock: 30 }
    ]
  },
  {
    name: "Smartphone",
    price: 24999,
    category: "Electronics",
    variants: [
      { color: "Black", size: "128GB", stock: 15 },
      { color: "Silver", size: "256GB", stock: 8 }
    ]
  },
  {
    name: "Sneakers",
    price: 2999,
    category: "Footwear",
    variants: [
      { color: "White", size: "9", stock: 20 },
      { color: "Blue", size: "10", stock: 10 },
      { color: "Black", size: "8", stock: 18 }
    ]
  }
]);
