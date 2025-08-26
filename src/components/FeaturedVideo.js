import React from 'react';
import { Box, Typography } from '@mui/material';

export default function FeaturedVideo() {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        mt: 8,
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h3"
        sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}
      >
        Featured Video
      </Typography>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '800px',  // 👈 fixed max width
          height: '450px',    // 👈 fixed height
          margin: '0 auto',
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/Oe4XqHv6fR0?si=ztoJhtZ8L4q8j1Vc"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '12px',
          }}
        ></iframe>
      </Box>
    </Box>
  );
}
