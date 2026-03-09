// import React, { useContext } from "react";

// const ProductList = ({ products, addToCart }) => {
// //const { addToCart } = useContext(CartContext);

//   return (
//     <div style={{ display: "flex", gap: "20px", flexWrap: "wrap",marginTop: "15px" }}>
//       {products.map(p => ( 
//         <div key={p.id} style={{ border: "1px solid #ccc", padding: "20px", width: "250px" }}>
//           <img src={p.imageUrl} alt={p.name} style={{ width: "100%",height: "50%" }} />
//           <h3>{p.name}</h3>
//           <p>{p.description}</p>
//           <strong>₹{p.price}</strong>
//           <br />
//           <button onClick={() => addToCart(p.id)} style={{ marginTop: "10px",backgroundColor: "lightblue" }}>
//             Add to Cart
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ProductList;

// import React, { useState } from "react";
// import "./ProductList.css";

// const ProductList = ({ products, addToCart }) => {
//   const [addedProducts, setAddedProducts] = useState({});

//   const handleAddToCart = (productId) => {
//     addToCart(productId);
//     setAddedProducts(prev => ({
//       ...prev,
//       [productId]: true,
//     }));
//   };

//   return (
//     <div className="product-grid">
//       {products.map(p => (
//         <div key={p.id} className="product-card">
//           <img src={p.imageUrl} alt={p.name} className="product-image" />

//           <h3 className="product-name">{p.name}</h3>
//           <p className="product-description">{p.description}</p>

//           <div className="product-price">₹{p.price}</div>

//           <button
//             className={`cart-btn ${addedProducts[p.id] ? "added" : ""}`}
//             disabled={addedProducts[p.id]}
//             onClick={() => handleAddToCart(p.id)}
//           >
//             {addedProducts[p.id] ? "Added to cart" : "Add to Cart"}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;

import React, { useState } from "react";
import "./ProductList.css";

const ProductList = ({ products, addToCart, setPage, setSelectedProduct }) => {
  const [addedProducts, setAddedProducts] = useState({});

  const handleAddToCart = (productId) => {
    addToCart(productId);
    setAddedProducts(prev => ({
      ...prev,
      [productId]: true,
    }));
  };

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    setPage("productDetails");
  };

  return (
    <div className="product-grid">
      {products.map(p => (
        <div key={p.id} className="product-card">

          {/* CLICKABLE AREA */}
          <div
            className="product-click"
            onClick={() => openProductDetails(p)}
          >
            <img
              src={p.imageUrl}
              alt={p.name}
              className="product-image"
            />

            <h3 className="product-name">{p.name}</h3>
            <p className="product-description">{p.description}</p>
          </div>

          <div className="product-price">₹{p.price}</div>

          <button
            className={`cart-btn ${addedProducts[p.id] ? "added" : ""}`}
            disabled={addedProducts[p.id]}
            onClick={() => handleAddToCart(p.id)}
          >
            {addedProducts[p.id] ? "Added to cart" : "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;



