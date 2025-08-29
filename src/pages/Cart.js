import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar"; // make sure the path is correct

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <Navbar /> {/* Add the Navbar here */}

      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <h1>Your Cart</h1>

        {cartItems.length === 0 ? (
          <h2>Your cart is empty</h2>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <p>{item.name} x {item.quantity} - ${item.price}</p>
              </div>
            ))}

            <h3>Total: ${totalPrice}</h3>
            <button>Checkout</button>
          </>
        )}
      </div>
    </div>
  );
}
