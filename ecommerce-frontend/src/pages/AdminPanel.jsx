import { useEffect, useState } from "react";
import api from "../api";
import "./AdminPanel.css";

function AdminPanel() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/admin/orders")
      .then(res => setOrders(res.data))
      .catch(() => alert("Access denied"));
  }, []);

  const updateStatus = (orderId, status) => {
    api.put(`/admin/orders/${orderId}/status?status=${status}`)
      .then(res => {
        setOrders(prev =>
          prev.map(o => o.id === orderId ? res.data : o)
        );
      });
  };

  return (
    <div className="admin-container">
      <h2>Admin Orders Panel</h2>

      {orders.map(order => (
        <div className="admin-order-card" key={order.id}>
          <div>
            <strong>Order #{order.id}</strong>
            <p>Total: ₹{order.totalAmount}</p>
            <p>Status: {order.status}</p>
          </div>

          <select
            value={order.status}
            onChange={e => updateStatus(order.id, e.target.value)}
          >
            <option value="PLACED">PLACED</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;
