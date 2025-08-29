import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Snackbar, Alert } from "@mui/material";
import TopProductCard from "./productCard/TopProductCard";

export default function TopProducts() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data.filter(p => p.category === "Trending") || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
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

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      await res.json();
      setMessage(`${product.name} added to cart!`);
      setOpen(true);
    } catch (err) {
      console.error(err);
      setMessage("Failed to add to cart");
      setOpen(true);
    }
  };

  return (
    <Box id="top-products" sx={{ mt: 12, px: 2 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        Trending Products
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <TopProductCard product={product} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpen(false)} severity="info" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );

}
