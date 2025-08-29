import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Snackbar, Alert } from '@mui/material';
import TopProductCard from './productCard/TopProductCard';

export default function TopProducts() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        // Filter Trending products
        const trending = data.filter((p) => p.category === 'Trending');
        setProducts(trending);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    setMessage(`${product.name} added to cart!`);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'clickaway') setOpen(false);
  };

  return (
    <Box sx={{ mt: 12, px: 2 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        Trending Products
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <TopProductCard
              product={product}
              onAddToCart={() => handleAddToCart(product)}
            />
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
