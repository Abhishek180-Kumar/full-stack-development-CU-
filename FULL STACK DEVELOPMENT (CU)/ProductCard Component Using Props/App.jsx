import React from "react";
import ProductCard from "./ProductCard";

function App() {
  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {/* Passing props dynamically */}
      <ProductCard name="iPhone 15 Pro" price={129999} inStock={true} />
      <ProductCard name="Samsung Galaxy S24" price={99999} inStock={false} />
      <ProductCard name="OnePlus 12R" price={45999} inStock={true} />
    </div>
  );
}

export default App;
