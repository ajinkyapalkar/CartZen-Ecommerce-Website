import { useEffect, useState } from "react";
import "./TrackOrder.css";

function TrackOrder({ order, setPage }) {
  const [currentOrder, setCurrentOrder] = useState(order);

  useEffect(() => {
    if (!order) {
      const saved = localStorage.getItem("selectedOrder");
      if (saved) {
        setCurrentOrder(JSON.parse(saved));
      }
    }
  }, [order]);

  if (!currentOrder) {
    return <h3 className="empty-track">No order selected</h3>;
  }

  const steps = [
    { key: "PLACED", label: "Placed", icon: "🛒" },
    { key: "PAID", label: "Paid", icon: "💳" },
    { key: "SHIPPED", label: "Shipped", icon: "🚚" },
    { key: "DELIVERED", label: "Delivered", icon: "📦" }
  ];

  const currentIndex = steps.findIndex(
    step => step.key === currentOrder.status
  );

  return (
    <div className="track-container">
      <h2 className="track-title">Track Your Order</h2>

      {/* ✅ ORDER SUMMARY */}
      <div className="order-summary">
        <div>
          <span>Total Amount</span>
          <strong>₹{currentOrder.totalAmount}</strong>
        </div>

        <div>
          <span>Date</span>
          <strong>{currentOrder.orderDate?.substring(0, 10)}</strong>
        </div>

        <div className={`status-pill ${currentOrder.status.toLowerCase()}`}>
          {currentOrder.status}
        </div>
      </div>

      {/* ✅ TIMELINE */}
      <div className="timeline-wrapper">
        <div className="timeline">
          {steps.map((step, index) => {
            let stepClass = "pending";

            if (index < currentIndex) stepClass = "completed";
            if (index === currentIndex) stepClass = "current";

            return (
              <div
                key={step.key}
                className={`timeline-step ${stepClass}`}
              >
                <div className="icon">{step.icon}</div>
                <span>{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ✅ ACTION BUTTON */}
      <div className="track-actions">
        <button className="back-btn" onClick={() => setPage("orders")}>
          ← Back to My Orders
        </button>
      </div>
    </div>
  );
}

export default TrackOrder;
