const API_URL = "http://localhost:8080/api/orders";

export const placeOrder = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/place`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) throw new Error("Failed to place order");

  return res.json();
};

export const getMyOrders = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(API_URL, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Failed to fetch orders");

  return res.json();
};
