function Checkout({ cart, setPage }) {
  const total = cart.items.reduce(
    (s, i) => s + i.product.price * i.quantity, 0
  );

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {cart.items.map(i => (
        <div className="checkout-item" key={i.id}>
          <img src={i.product.imageUrl} />
          <div>
            <h4>{i.product.name}</h4>
            <p>Qty: {i.quantity}</p>
          </div>
          <p>₹{i.product.price * i.quantity}</p>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>
      <button onClick={() => setPage("payment")}>Proceed to Payment</button>
    </div>
  );
}
export default Checkout;