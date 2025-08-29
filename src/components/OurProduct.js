import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tabs, Tab, Snackbar, Alert } from '@mui/material';
import OurProductCard from './productCard/OurProductCard';

export default function OurProducts() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleTabChange = (event, newValue) => setTab(newValue);

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

  const categories = ['All', 'New', 'Trending'];
  const filteredProducts = products.filter((p) => {
    if (categories[tab] === 'All') return true;
    return p.category === categories[tab];
  });

  if (loading) return <Typography align="center">Loading products...</Typography>;

  return (
    <Box sx={{ mt: 12, px: 2 }}>
      <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        Our Product
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Tabs value={tab} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
          {categories.map((cat) => (
            <Tab key={cat} label={cat} />
          ))}
        </Tabs>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <OurProductCard product={product} onAddToCart={() => handleAddToCart(product)} />
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
