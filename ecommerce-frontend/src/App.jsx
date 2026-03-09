import React, { useState, useEffect } from "react";
import api from "./api";

// Components
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import Payment from "./pages/Payment";
import TrackOrder from "./pages/TrackOrder";
import AdminPanel from "./pages/AdminPanel";

function App() {
  const [page, setPage] = useState("login","products");
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [cart, setCart] = useState({ items: [] });
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);


  useEffect(() => {
    if (auth) {
      fetchOrders();
      api.get("/products").then(res => setProducts(res.data));
      api.get("/cart").then(res => setCart(res.data));
    }
  }, [auth]);

  const addToCart = async (productId) => {
    const res = await api.post(`/cart/add/${productId}`);
    setCart(res.data);
  };

  const decreaseQuantity = async (productId) => {
    const res = await api.post(`/cart/decrease/${productId}`);
    setCart(res.data);
  };

  const removeFromCart = async (productId) => {
    const res = await api.post(`/cart/remove/${productId}`);
    setCart(res.data);
  };

  const clearCart = async () => {
    const res = await api.post("/cart/clear");
    setCart(res.data);
  };

  const placeOrder = async () => {
  try {
    await api.post("/orders/place");
    //await fetchOrders();
    // ✅ fetch latest orders AFTER placing order
    const res = await api.get("/orders");
    setOrders(res.data);
    setCart({ items: [] });
    //setPage("orders");
  } catch (err) {
    console.error("Order failed", err);
    alert("Failed to place order");
  }
};


  const fetchOrders = async () => {
  try {
    const res = await api.get("/orders"); // ✅ correct
    setOrders(res.data);
  } catch (err) {
    console.error("Failed to fetch orders", err);
  }
};


  const logout = () => {
    localStorage.clear();
    setAuth(false);
    setPage("login");
  };

  return (
    <div>
      {auth && (
        <Navbar
          setPage={setPage}
          logout={logout}
          cart={cart}
          username={username}
          fetchOrders={fetchOrders}
        />
      )}

      {!auth && page === "login" && (
        <Login setAuth={setAuth} setPage={setPage} setUsername={setUsername} />
      )}

      {!auth && page === "register" && <Register setPage={setPage} />}

      {auth && page === "dashboard" && <Dashboard setPage={setPage} />}

      {auth && page === "products" && (
        <ProductList products={products} addToCart={addToCart} setPage={setPage} setSelectedProduct={setSelectedProduct} />
      )}

      {page === "productDetails" && (
        <ProductDetails
          addToCart={addToCart}
          setPage={setPage}
        />
      )}

      {auth && page === "cart" && (
        <Cart
          cart={cart}
          addToCart={addToCart}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          setPage={setPage}
        />
      )}

      {auth && page === "checkout" && (
        <Checkout 
          cart={cart} 
          placeOrder={placeOrder} 
          setPage={setPage} />
      )}

      {auth && page === "payment" && (
        <Payment
          cart={cart}
          placeOrder={placeOrder}
          setPage={setPage}
          />
      )}

      {auth && page === "ordersuccess" && <OrderSuccess setPage={setPage}/>}

      {auth && page === "orders" && (
        <Orders
        orders={orders}
        setPage={setPage}
        setSelectedOrder={setSelectedOrder}
        />
      )}

      {auth && page === "track" && (
        <TrackOrder order={selectedOrder} setPage={setPage} />
      )}

      {auth && page === "admin" && <AdminPanel />}

    </div>
  );
}

export default App;

