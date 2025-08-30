import { Box, Typography, Button } from '@mui/material';
import productImage from '../../../assets/new-product.png'; // replace with your image

export default function NewProductSection() {
  return (
    <Box
      sx={{
        background: '#fbeaf5',
        color: '#333',
        pt: 8,
        pb: 8,
        px: 2,
        mt: 20,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center', // or 'center' if you want it centered
          gap: '15%', // controls spacing between text and image
          maxWidth: 1200,
          mx: 'auto',
        }}
        > 
        {/* Text Content */}
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 0 } }}>
          <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold' }}>
            New Product<br />Collection
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Check out our latest arrivals crafted for style and comfort.<br />
            Don’t miss out on the trendiest footwear!
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: '#414041',
              color: '#fff',
              fontWeight: 'bold',
            }}
          >
            Explore Now
          </Button>
        </Box>

        {/* Image */}
        <Box sx={{ flexShrink: 0 }}>
          <img
            src={productImage}
            alt="New Product"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }}
          />
        </Box>
      </Box>
    </Box>
  );
}
