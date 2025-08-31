import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Snackbar, Alert } from "@mui/material";
import { CartContext } from "../cart/CartContext";
import TopProductCard from "./TopProductCard"; // import card component
import topProduct1 from "../../../assets/topProduct1.png";
import topProduct2 from "../../../assets/topProduct2.png";
import topProduct3 from "../../../assets/topProduct3.png";


export default function TopProducts() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Static product list
  const products = [
    {
      _id: "1",
      name: "Tanjiro Kamado Sneakers - Demon Slayer™",
      price: 199.99,
      subtitle: "Limited Edition Sneakers",
      image: topProduct1,
    },
    {
      _id: "2",
      name: "Rengoku Sneakers - Demon Slayer™",
      price: 149.99,
      subtitle: "Special Anime Edition",
      image: topProduct2,
    },
    {
      _id: "3",
      name: "Nezuko Sneakers - Demon Slayer™",
      price: 179.99,
      subtitle: "Collector's Edition",
      image: topProduct3,
    },
  ];


  const handleAddToCart = async (product) => {
    const success = await addToCart(product);
    if (success) {
      setMessage(`${product.name} added to cart!`);
      setOpen(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <Box id="top-products" sx={{ mt: 12, px: 2 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
        Trending Products
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <TopProductCard product={product} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setOpen(false)} severity="info" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
