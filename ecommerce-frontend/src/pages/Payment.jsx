import { useState } from "react";
import "./Payment.css";

function Payment({ cart, placeOrder, setPage }) {

  const [paymentMethod, setPaymentMethod] = useState(null);

  const total = cart.items.reduce(
    (s, i) => s + i.product.price * i.quantity,
    0
  );

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h3>Total Payable</h3>
        <h1>₹{total}</h1>

        {/* ✅ UPI */}
        <div className="method">
          <input
            type="radio"
            name="pay"
            checked={paymentMethod === "UPI"}
            onChange={() => setPaymentMethod("UPI")}
          />
          <span>UPI</span>
          {paymentMethod === "UPI" && <div className="upi-qr"></div>}
        </div>

        {/* ✅ CARD */}
        <div className="method">
          <input
            type="radio"
            name="pay"
            checked={paymentMethod === "CARD"}
            onChange={() => setPaymentMethod("CARD")}
          />
          <span>Card</span>

          {paymentMethod === "CARD" && (
            <>
              <input placeholder="Card Number" style={{ width: "95%" }} />
              <div className="row">
                <input placeholder="MM/YY" />
                <input placeholder="CVV" />
              </div>
            </>
          )}
        </div>

        {/* ✅ COD */}
        <div className="method">
          <input
            type="radio"
            name="pay"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          <span>Cash on Delivery</span>
        </div>

        {/* ✅ BUTTON DISABLED IF NOT SELECTED */}
        <button
          className="pay-btn"
          disabled={!paymentMethod}
          onClick={() => {
            placeOrder(paymentMethod);
            setPage("ordersuccess");
          }}
        >
          Pay & Place Order
        </button>
        

        {!paymentMethod && (
          <p className="pay-warning">Please select a payment method</p>
          
        )}
      </div>
    </div>
  );
}

export default Payment;
