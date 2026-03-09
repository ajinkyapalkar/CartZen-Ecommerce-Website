import React from "react";
import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) return <p>Order not found</p>;

  return (
    <div className="container mt-4">
      <h2>Order #{order.id}</h2>
      <p>Status: {order.status}</p>
      <p>Total: ₹{order.totalAmount}</p>

      <h4 className="mt-3">Items</h4>
      <ul className="list-group">
        {order.items.map(item => (
          <li className="list-group-item" key={item.id}>
            {item.product.name} × {item.quantity} — ₹{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
