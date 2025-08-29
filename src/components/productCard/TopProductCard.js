import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material';

export default function TopProductCard({ product, onAddToCart }) {
  return (
    <Card
      sx={{
        width: 300,
        height: 310,
        backgroundColor: '#fe8b8d',
        transition: 'background-color 0.3s',
        cursor: 'pointer',
        '&:hover': { backgroundColor: '#a90c8d' },
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        mt: 15,
      }}
    >
      <CardMedia
        component="img"
        image={`${process.env.PUBLIC_URL}${product.image}`} // Use PUBLIC_URL for basename
        alt={product.name}
        sx={{
          width: 250,
          height: 250,
          objectFit: 'cover',
          margin: '0 auto',
          borderRadius: 8,
          transform: 'rotate(-30deg) translateX(40px) translateY(-100px)',
          transition: 'transform 0.3s',
        }}
      />

      <CardContent
        sx={{
          mt: -14,
          textAlign: "center",
          color: 'white',
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', wordWrap: 'break-word', whiteSpace: 'normal' }}
        >
          {product.name}
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 1, fontWeight: 'bold' }}>
          {product.price}
        </Typography>
        {product.subtitle && (
          <Typography variant="body2" sx={{ color: '#fff' }}>
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
            color: '#fff',
            '&:hover': { backgroundColor: '#414041 !important', boxShadow: 'none' },
          }}
          onClick={() => onAddToCart(product)} // Pass full product
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
