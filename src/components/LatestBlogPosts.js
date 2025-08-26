import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import blogImage1 from '../assets/blogs1.webp';
import blogImage2 from '../assets/blogs2.webp';

const blogPosts = [
  {
    id: 1,
    image: blogImage1,
    date: 'Aug 26, 2025 · 10:30 AM',
    title: 'New Collection Launched',
    subtitle: 'Check out our latest arrivals that bring style and comfort together.',
  },
  {
    id: 2,
    image: blogImage2,
    date: 'Aug 25, 2025 · 6:00 PM',
    title: 'Summer Sale Tips',
    subtitle: 'Discover how to maximize your savings with our seasonal discounts.',
  },
];

export default function LatestBlogPosts() {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        mt: 8,
      }}
    >
      <Typography
        variant="h3"
        sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}
      >
        Latest Blog Posts
      </Typography>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 5, md: 14 }}
        mt={7}
        justifyContent="center"
        alignItems="stretch"
      >
        {blogPosts.map((post) => (
          <Box
            key={post.id}
            sx={{
              display: 'flex',
              flexDirection: 'column', // 👈 stack image above content
              width: { xs: '100%', md: '30%' },
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: '#fff',
            }}
          >
            {/* Image */}
            <Box
              component="img"
              src={post.image}
              alt={post.title}
              sx={{
                width: '100%',
                height: 280,
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />

            {/* Text Content */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
                p: 2,
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', mb: 1 }}
                >
                  {post.date}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {post.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {post.subtitle}
                </Typography>
              </Box>

              <Button
                variant="text"
                sx={{
                  mt: 2,
                  color: '#bb268c',
                  fontWeight: 'bold',
                  alignSelf: 'flex-start',
                }}
              >
                Read More →
              </Button>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
