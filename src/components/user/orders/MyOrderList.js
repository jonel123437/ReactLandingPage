import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  Divider,
  CircularProgress,
  Box,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    // Check for toast message from checkout
    const message = localStorage.getItem("toastMessage");
    if (message) {
      setToastMessage(message);
      setToastOpen(true);
      localStorage.removeItem("toastMessage");
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(amount);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 4, textAlign: "center" }}>
        {error}
      </Typography>
    );
  }

  if (orders.length === 0) {
    return (
      <Typography sx={{ mt: 4, textAlign: "center" }}>
        You have no orders yet.
      </Typography>
    );
  }

  return (
    <>
      <Paper sx={{ p: 3, width: "95%", mx: "auto", mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          My Orders
        </Typography>
        <List>
          {orders.map((order) => (
            <React.Fragment key={order._id}>
              <ListItem sx={{ flexDirection: "column", alignItems: "flex-start", p: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Order ID: {order._id}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  Payment Status: {order.paymentStatus}
                </Typography>

                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Items:
                  </Typography>
                  <Stack spacing={0.5} sx={{ ml: 2, mt: 0.5 }}>
                    {order.items.map((item) => {
                      const itemTotal = Number(item.price) * item.quantity;
                      return (
                        <Typography key={item.productId} variant="body2">
                          {item.name} x {item.quantity} ({formatCurrency(itemTotal)})
                        </Typography>
                      );
                    })}
                  </Stack>
                </Box>

                <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
                  Total Amount: {formatCurrency(order.totalAmount)}
                </Typography>
              </ListItem>
              <Divider sx={{ my: 2 }} />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Toast message */}
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
    </>
  );
}
