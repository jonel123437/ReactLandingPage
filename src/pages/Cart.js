import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CartList from "../components/CartList";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cart", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setCartItems(data.cart || []);
      } catch (err) {
        setError("Failed to load cart items.");
      }
    };
    fetchCart();
  }, []);

  // Remove item from cart
  const handleRemove = async (productId) => {
    try {
      const res = await fetch("http://localhost:5000/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      setCartItems(data.cart || []);
    } catch {
      setError("Failed to remove item.");
    }
  };

  // Adjust quantity of an item
  const handleQuantityChange = async (productId, delta) => {
    try {
      const res = await fetch("http://localhost:5000/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, delta }),
      });
      const data = await res.json();
      setCartItems(data.cart || []);
    } catch {
      setError("Failed to update quantity.");
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
        <h1>Your Cart</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <CartList
          cartItems={cartItems}
          handleRemove={handleRemove}
          handleQuantityChange={handleQuantityChange} // pass to CartList
        />
      </div>
    </div>
  );
}
