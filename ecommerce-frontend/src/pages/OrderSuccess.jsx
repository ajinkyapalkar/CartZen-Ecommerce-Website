import "./OrderSuccess.css";

function OrderSuccess({ setPage }) {
  return (
    <div className="order-success-wrapper">
      <div className="order-success-card">
        <div className="success-icon">✓</div>

        <h2>Order Placed Successfully!</h2>
        <p>Your order has been placed and is being processed.</p>

        <div className="success-buttons">
          <button
            className="view-orders-btn"
            onClick={() => setPage("orders")}
          >
            View My Orders
          </button>

          <button
            className="continue-btn"
            onClick={() => setPage("products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
