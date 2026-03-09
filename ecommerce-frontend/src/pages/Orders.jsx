import "./MyOrders.css";

function Orders({ orders, setPage, setSelectedOrder }) {
  // safety check
  if (!orders || orders.length === 0) {
    return (
      <div className="orders-page">
        <h2>My Orders</h2>
        <p>No orders placed yet.</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.map(order => (
        <div className="order-card" key={order.id}>
          <div className="order-header">
            <span><strong>Order ID:</strong> #{order.id}</span>
            <span className={`status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </div>

          <p><strong>Total:</strong> ₹{order.totalAmount}</p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(order.orderDate).toLocaleString()}
          </p>

          <button
            className="track-btn"
            onClick={() => {
            setSelectedOrder(order);  
            localStorage.setItem("selectedOrder", JSON.stringify(order)); 
            setPage("track");          // ✅ navigate
            }}
          >
            Track Order
          </button>
        </div>
      ))}
    </div>
  );
}

export default Orders;
