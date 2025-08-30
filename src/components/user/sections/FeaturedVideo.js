import React, { useContext, useState } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, Snackbar, Alert } from '@mui/material';
import { CartContext } from "../cart/CartContext";
import { useNavigate } from 'react-router-dom';

export default function FeaturedVideo() {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const product = {
    id: "68b10f8b0400b3406e6006b1",
    name: "Zenitsu Agatsuma Sneakers - Demon Slayer™",
    price: "$44.99",
    subtitle: "Short description",
    image: "/images/image5.png",
    category: "Trending"
  };

  const handleAddToCart = async () => {
    const success = await addToCart({
      _id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      category: product.category
    });

    if (success) {
      setMessage(`${product.name} added to cart!`);
      setOpen(true);
    } else {
      navigate("/login");
    }
  };

  const handleClose = (event, reason) => {
    if (reason !== 'clickaway') setOpen(false);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, mt: 8, textAlign: 'center' }}>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
        Featured Video
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 4, color: 'text.secondary', fontStyle: 'italic' }}>
        Real footage of Zenitsu using the Zenitsu Agatsuma Sneakers - Demon Slayer™
      </Typography>

      <Box sx={{ position: 'relative', width: '100%', maxWidth: '800px', height: '450px', mx: 'auto', mb: 6 }}>
        <iframe
          src="https://www.youtube.com/embed/Oe4XqHv6fR0?si=ztoJhtZ8L4q8j1Vc"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '12px' }}
        ></iframe>
      </Box>

      <Card sx={{ maxWidth: 345, mx: 'auto', textAlign: 'center', borderRadius: 3 }}>
        <CardMedia
          component="img"
          height="200"
          image={`${process.env.PUBLIC_URL}${product.image}`}
          alt={product.name}
          sx={{ objectFit: 'contain', p: 1 }}
        />
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
          <Typography variant="body2" color="text.secondary">{product.subtitle}</Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>{product.price}</Typography>
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: '#414041', color: '#fff', '&:hover': { backgroundColor: '#333' } }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>

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
