import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material';

export default function OurProductCard({ product, onAddToCart }) {
  return (
    <Card
      sx={{
        width: { xs: 320, sm: 300, md: 350 },
        minHeight: 480,
        border: '1px solid #ddd',
        borderRadius: 2,
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <CardMedia
        component="img"
        // Use PUBLIC_URL to respect basename
        image={`${process.env.PUBLIC_URL}${product.image}`}
        alt={product.name}
        sx={{
          width: 250,
          height: 250,
          objectFit: 'cover',
          margin: '0 auto',
          borderRadius: 8,
        }}
      />

      <CardContent>
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', wordWrap: 'break-word', whiteSpace: 'normal' }}
        >
          {product.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
          {product.price}
        </Typography>
        {product.subtitle && (
          <Typography variant="subtitle2" color="text.secondary">
            {product.subtitle}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'center' }}>
        <Button
          variant="contained"
          sx={{
            width: '60%',
            backgroundColor: '#414041',
          }}
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
