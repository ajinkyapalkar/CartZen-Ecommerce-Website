import React from "react";
import "./Navbar.css";
import { getMyOrders } from "../services/orderService";

function Navbar({ setPage, logout, cart, username }) {

  const role = localStorage.getItem("role");
  const isAdmin = role === "ROLE_ADMIN";

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo" onClick={() => setPage("dashboard")}>
          CartZen
        </h2>
      </div>

      <div className="navbar-right">
        <span className="welcome-text">
          Welcome, <strong>{username}</strong>
        </span>

        {/* 🔐 ADMIN NAV */}
        {isAdmin && (
          <button
            className="admin-btn"
            onClick={() => setPage("admin")}
          >
            Admin Panel
          </button>
        )}

        {/* 👤 USER NAV */}
        {!isAdmin && (
          <>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage("products");
              }}
            >
              Products
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage("cart");
              }}
            >
              Cart {cart.items.length > 0 && `(${cart.items.length})`}
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                getMyOrders();
                setPage("orders");
              }}
            >
              My Orders
            </a>
          </>
        )}

        {/* 🚪 LOGOUT (BOTH) */}
        <a
          href="#"
          className="logout-btn"
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          Logout
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
