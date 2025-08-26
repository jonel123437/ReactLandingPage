import React, { useState } from 'react';
import { Box, Typography, Grid, Snackbar, Alert } from '@mui/material';
import TopProductCard from './productCard/TopProductCard';
import { allProducts } from '../data/products';

export default function TopProducts() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const topProducts = allProducts.filter((p) => [1, 2, 3].includes(p.id));

  const handleAddToCart = (name) => { setMessage(`${name} added to cart!`); setOpen(true); };
  const handleClose = (event, reason) => { if (reason !== 'clickaway') setOpen(false); };

  return (
    <Box sx={{ mt: 12, px: 2 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        Top Selling Products
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {topProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <TopProductCard product={product} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>{message}</Alert>
      </Snackbar>
    </Box>
  );
}
