import React from "react";
import "./ProductCard.css"; // Import CSS

// Reusable ProductCard Component
function ProductCard({ name, price, inStock }) {
  return (
    <div className="card">
      <h2 className="title">{name}</h2>
      <p className="price">Price: ₹{price}</p>
      <p className={inStock ? "stock in-stock" : "stock out-of-stock"}>
        {inStock ? "In Stock ✅" : "Out of Stock ❌"}
      </p>
    </div>
  );
}

export default ProductCard;
