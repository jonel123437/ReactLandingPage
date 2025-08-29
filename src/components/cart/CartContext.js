import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch initial cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cart", {
          credentials: "include",
        });
        const data = await res.json();
        setCartItems(data.cart || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };
    fetchCart();
  }, []);

  // Function to add a product
  const addToCart = async (product) => {
    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
          category: product.category
        }),
      });

      if (res.status === 401) return false; // unauthorized

      const data = await res.json();
      // Update local cart state immediately
      setCartItems(data.cart || []);
      return true;
    } catch (err) {
      console.error("Failed to add to cart:", err);
      return false;
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
