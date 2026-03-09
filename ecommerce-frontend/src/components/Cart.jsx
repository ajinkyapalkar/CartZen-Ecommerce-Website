import "./Cart.css"
function Cart({ cart, addToCart, decreaseQuantity, removeFromCart, clearCart, setPage }) {
  const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div style={{ width: "100%", minHeight: "calc(100vh - 70px)", padding: "20px", boxSizing: "border-box" }}>
      
      {cart.items.length === 0 ? (
        <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",        // ★ full width
      height: "70vh",       // ★ center vertically
      color: "#555",
      fontSize: "1.6rem",
      textAlign: "center",
    }}
  >
    <p>No items in your cart</p>
  </div>
      ) : (
        <div className="cart-container">
  <h2 className="cart-title">Your Cart</h2>

  <div className="cart-grid">
    {cart.items.map(item => (
      <div key={item.id} className="cart-card">
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          className="cart-card-image"
        />

        <h3 className="cart-card-title">{item.product.name}</h3>

        <p className="cart-card-price">₹{item.product.price}</p>

        <div className="quantity-controls">
          <button onClick={() => addToCart(item.product.id)}>+</button>
          <span>{item.quantity}</span>
          <button onClick={() => decreaseQuantity(item.product.id)}>-</button>
        </div>

        <button
          className="remove-btn"
          onClick={() => removeFromCart(item.product.id)}
        >
          Remove
        </button>
      </div>
    ))}
  </div>

  <h3 className="cart-total">Total: ₹{total.toFixed(2)}</h3>

  <button
  
  onClick={() => setPage("payment")}
>
  Proceed to Checkout
</button>


  <button className="clear-cart-btn" onClick={clearCart}>
    Clear Cart
  </button>
</div>

      )}
    </div>
  );
}

export default Cart;
