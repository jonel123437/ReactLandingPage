import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Divider,
  Typography,
  Button,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

export default function CartList({ cartItems, handleRemove, setCartItems }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  // Load selected items from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("selectedCartItems") || "[]");
    const cartIds = cartItems.map(item => item.productId);
    setSelectedItems(saved.filter(id => cartIds.includes(id)));
  }, [cartItems]);

  // Update quantity in the database
  const handleQuantityChange = async (productId, delta) => {
    try {
      const res = await fetch("http://localhost:5000/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, delta }),
      });

      if (!res.ok) {
        throw new Error("Failed to update quantity.");
      }

      const data = await res.json();
      setCartItems(data.cart);
    } catch (err) {
      console.error(err);
      alert("Failed to update quantity.");
    }
  };

  const handleToggle = (productId) => {
    setSelectedItems((prev) => {
      const newSelected = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem("selectedCartItems", JSON.stringify(newSelected));
      return newSelected;
    });
  };

  const handleIncrease = (productId) => {
    handleQuantityChange(productId, 1);
  };

  const handleDecrease = (productId) => {
    handleQuantityChange(productId, -1);
  };

  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item.productId))
    .reduce(
      (total, item) => total + Number(item.price.replace("$", "")) * item.quantity,
      0
    );

  const handleShopNow = () => {
    navigate("/"); // go to home page
    setTimeout(() => {
      const section = document.querySelector("#top-products");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (cartItems.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: "center", bgcolor: "#f9f9f9" }}>
        <ShoppingCartIcon sx={{ fontSize: 60, color: "gray", mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Looks like you haven't added any items yet.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleShopNow}>
          Shop Now
        </Button>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      <List>
        {cartItems.map((item) => (
          <React.Fragment key={item.productId}>
            <ListItem
              sx={{ pl: 0, cursor: "pointer" }}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleRemove(item.productId)}>
                  <DeleteIcon />
                </IconButton>
              }
              onClick={() => handleToggle(item.productId)}
            >
              <Checkbox
                checked={selectedItems.includes(item.productId)}
                onChange={() => handleToggle(item.productId)}
                sx={{ pl: 0, mr: 1 }}
              />
              <ListItemAvatar>
                <Avatar
                  src={`${process.env.PUBLIC_URL}${item.image}`}
                  variant="rounded"
                  alt={item.name}
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={`$${Number(item.price.replace("$", "")).toFixed(2)} x ${item.quantity}`}
              />
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <IconButton
                  onClick={(e) => { e.stopPropagation(); handleDecrease(item.productId); }}
                  disabled={item.quantity <= 1}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                <IconButton
                  onClick={(e) => { e.stopPropagation(); handleIncrease(item.productId); }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
        <Button
          variant="contained"
          color="primary"
          disabled={selectedItems.length === 0}
        >
          Checkout
        </Button>
      </Box>
    </Paper>
  );
}
