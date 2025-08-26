import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import sampleImage from '../assets/image7.png'; // replace with your image path

export default function DiscountSection() {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 }, // smaller padding on mobile
        display: 'flex',
        justifyContent: 'center',
        background: '#fbeaf5',
        mt: { xs: 6, sm: 12 }, // smaller margin on mobile
      }}
    >
      {/* Flexbox wrapper */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // stack on mobile, row on md+
          alignItems: 'center',
          gap: { xs: 4, md: 10, lg: 15 }, // responsive gap
          maxWidth: 1000,
          width: '100%',
        }}
      >
        {/* Image on the left / top */}
        <Box
          component="img"
          src={sampleImage}
          alt="Discount"
          sx={{
            width: { xs: '100%', sm: '80%', md: '40%' }, // full width on mobile
            borderRadius: 2,
            objectFit: 'cover',
            mx: 'auto', // center on mobile
          }}
        />

        {/* Text on the right / bottom */}
        <Box flex={1} textAlign={{ xs: 'center', md: 'left' }}>
          <Stack
            spacing={2}
            alignItems={{ xs: 'center', md: 'flex-start' }}
          >
            <Typography variant="h2" component="h2" sx={{ fontWeight: 600 }}>
              Up To
            </Typography>
            <Typography
              variant="h1"
              component="h1"
              sx={{ fontWeight: 'bold', color: '#414041' }}
            >
              50% off
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 500,
                whiteSpace: 'normal',
                wordBreak: 'break-word',
              }}
            >
              Get the best deals on our top-selling products this season.
              Limited-time offers you don’t want to miss out on.
              Shop now and save big before the sale ends!
            </Typography>

            {/* Responsive button */}
            <Button
              variant="contained"
              sx={{
                width: { xs: '80%', sm: '60%', md: '50%' },
                backgroundColor: '#414041',
              }}
            >
              ADD TO CART
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
