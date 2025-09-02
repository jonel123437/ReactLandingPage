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
  CircularProgress,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CartList({ cartItems, handleRemove, handleQuantityChange }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [loadingIds, setLoadingIds] = useState([]);
  const [toastOpen, setToastOpen] = useState(false); // <-- toast state
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("selectedCartItems") || "[]");
    const cartIds = cartItems.map(item => item.productId);
    setSelectedItems(saved.filter(id => cartIds.includes(id)));
  }, [cartItems]);

  const handleCheckout = async () => {
    try {
      const totalAmount = cartItems
        .filter(item => selectedItems.includes(item.productId))
        .reduce((total, item) => total + Number(item.price) * item.quantity, 0);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to checkout.");
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      };

      // 1️⃣ Create payment intent via backend
      const paymentResponse = await axios.post(
        "http://localhost:5000/api/payment/intent",
        { amount: totalAmount },
        config
      );
      const paymentIntent = paymentResponse.data.data;

      // 2️⃣ Create order in backend
      await axios.post(
        "http://localhost:5000/api/cart/checkout",
        { paymentIntentId: paymentIntent.id },
        config
      );

      // 3️⃣ Clear local selection
      setSelectedItems([]);
      localStorage.removeItem("selectedCartItems");

      // ✅ Show toast
      setToastMessage("Order successfully placed!");
      setToastOpen(true);
      localStorage.setItem("toastMessage", "Order successfully placed!");
      navigate("/my-order");
    } catch (error) {
      console.error("Checkout Error:", error.response?.data || error.message);
      alert("Failed to checkout. Please try again.");
    }
  };

  const handleIncrease = async (productId) => {
    setLoadingIds(prev => [...prev, productId]);
    await handleQuantityChange(productId, 1);
    setLoadingIds(prev => prev.filter(id => id !== productId));
  };

  const handleDecrease = async (productId) => {
    setLoadingIds(prev => [...prev, productId]);
    await handleQuantityChange(productId, -1);
    setLoadingIds(prev => prev.filter(id => id !== productId));
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

  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item.productId))
    .reduce((total, item) => total + Number(item.price.replace("$", "")) * item.quantity, 0);

  const totalPriceFormatted = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(totalPrice);

  const handleShopNow = () => {
    navigate("/home");
    setTimeout(() => {
      const section = document.querySelector("#our-products");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center", bgcolor: "#f9f9f9" }}>
          <ShoppingCartIcon sx={{ fontSize: 60, color: "gray", mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Looks like you haven't added any items yet.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#414041',
              color: '#fff',
              '&:hover': { backgroundColor: '#333' }
            }}
            onClick={handleShopNow}
          >
            Shop Now
          </Button>
        </Paper>
      ) : (
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
                    secondary={`₱${Number(item.price).toFixed(2)} x ${item.quantity}`}
                  />
                  <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                    <Tooltip title={item.quantity <= 1 ? "Minimum quantity is 1" : ""}>
                      <span>
                        <IconButton
                          onClick={(e) => { e.stopPropagation(); handleDecrease(item.productId); }}
                          disabled={item.quantity <= 1 || loadingIds.includes(item.productId)}
                        >
                          {loadingIds.includes(item.productId) ? <CircularProgress size={20} /> : <RemoveIcon />}
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                    <IconButton
                      onClick={(e) => { e.stopPropagation(); handleIncrease(item.productId); }}
                      disabled={loadingIds.includes(item.productId)}
                    >
                      {loadingIds.includes(item.productId) ? <CircularProgress size={20} /> : <AddIcon />}
                    </IconButton>
                  </Box>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Total: {totalPriceFormatted}</Typography>
            <Button
              variant="contained"
              color="primary"
              disabled={selectedItems.length === 0}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </Box>

          {/* ✅ Toast */}
          <Snackbar
            open={toastOpen}
            autoHideDuration={4000}
            onClose={() => setToastOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="success" onClose={() => setToastOpen(false)}>
              {toastMessage}
            </Alert>
          </Snackbar>
        </Paper>
      )}
    </>
  );
}
