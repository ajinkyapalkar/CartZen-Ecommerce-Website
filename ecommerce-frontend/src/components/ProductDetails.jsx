import { useEffect, useState } from "react";
import "./ProductDetails.css";

function ProductDetails({ addToCart, setPage }) {
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("selectedProduct");
    if (saved) {
      setProduct(JSON.parse(saved));
    }
  }, []);

  if (!product) {
    return <h3 style={{ textAlign: "center" }}>Product not found</h3>;
  }

  const handleAdd = () => {
    addToCart(product.id);
    setAdded(true);
  };

  return (
    <div className="product-details-container">
      <div className="details-card">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="details-image"
        />

        <div className="details-info">
          <h2>{product.name}</h2>
          <p className="details-desc">{product.description}</p>
          <h3 className="details-price">₹{product.price}</h3>

          <button
            className={`details-cart-btn ${added ? "added" : ""}`}
            onClick={handleAdd}
            disabled={added}
          >
            {added ? "Added to Cart" : "Add to Cart"}
          </button>

          <button
            className="back-btn"
            onClick={() => setPage("products")}
          >
            ← Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
