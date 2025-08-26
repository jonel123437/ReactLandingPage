import React, { useState } from 'react';
import { Box, Typography, Grid, Tabs, Tab, Snackbar, Alert } from '@mui/material';
import OurProductCard from './productCard/OurProductCard';
import { allProducts } from '../data/products';

export default function OurProducts() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleTabChange = (event, newValue) => setTab(newValue);
  const handleAddToCart = (name) => { setMessage(`${name} added to cart!`); setOpen(true); };
  const handleClose = (event, reason) => { if (reason !== 'clickaway') setOpen(false); };

  const categories = ['All', 'New', 'Trending'];
  const filteredProducts = allProducts.filter((p) => {
    if (categories[tab] === 'All') return true;
    if (categories[tab] === 'New') return p.category === 'New';
    if (categories[tab] === 'Trending') return [1, 2, 3].includes(p.id);
  });

  return (
    <Box sx={{ mt: 12, px: 2 }}>
      <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        Our Product
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Tabs value={tab} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
          {categories.map((cat) => <Tab key={cat} label={cat} />)}
        </Tabs>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <OurProductCard product={product} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>{message}</Alert>
      </Snackbar>
    </Box>
  );
}
