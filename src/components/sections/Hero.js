import { Box, Typography, Button } from '@mui/material';
import heroShoes from '../../assets/hero-shoes.png';

export default function Hero() {
  return (
    <Box
      sx={{
        position: 'relative',
        background: 'linear-gradient(to right, #bb268c, #f0768c)',
        color: '#fff',
        pt: 8,
        pb: 0, // remove extra padding at bottom to let wave sit naturally
        px: 2,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 1200,
          mx: 'auto',
          pb: 8, // push content up to give space for wave
        }}
      >
        {/* Hero Text */}
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 0 } }}>
          <Typography variant="h2" component="h1" sx={{ fontSize: { xs: "2.5rem", md: "3.8rem" }, lineHeight: 1.2, fontWeight: 'bold' }}>
            DISCOVER THE<br />WORLD WITH NEW<br />FOOTWEAR
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Explore our wide range of stylish footwear that combines comfort, quality, and the latest trends.
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: '#fff',
              color: '#bb268c',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#f0f0f0' },
            }}
            onClick={() => {
              const section = document.getElementById('our-products');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            View All
          </Button>

        </Box>

        {/* Hero Image */}
        <Box sx={{ flexShrink: 0 }}>
          <img src={heroShoes} alt="Footwear showcase" style={{ maxWidth: '100%', height: 'auto' }} />
        </Box>
      </Box>

      {/* Wave SVG moved outside content wrapper */}
      <Box
        component="svg"
        viewBox="0 0 1440 150"
        xmlns="http://www.w3.org/2000/svg"
        sx={{
          display: 'block',
          width: { xs: '150%', sm: '103%' },
          mx: { xs: -10, sm: -2 }, // smaller negative margin on mobile
          mt: { xs: -10, sm: -20 }, // less top margin on small screens
          height: 'auto',
        }}
      >
        <path
          fill="#f8f8f8"
          d="M0,80 
             C180,320 360,-160 720,80 
             C1080,320 1260,-160 1440,80 
             L1440,150 
             L0,160 
             Z"
        />
      </Box>
    </Box>
  );
}
