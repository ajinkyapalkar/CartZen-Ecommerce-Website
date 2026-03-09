import React from "react";
import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5>Order #{order.id}</h5>
        <p>Status: <strong>{order.status}</strong></p>
        <p>Total: ₹{order.totalAmount}</p>
        <p>Date: {order.orderDate?.substring(0, 10)}</p>

        <Link to={`/orders/${order.id}`} className="btn btn-outline-primary btn-sm">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
