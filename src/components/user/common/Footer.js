import React from "react";
import { Box, Grid, Typography, IconButton, Link, Divider } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn, Phone, Email, LocationOn } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box sx={{ background: 'linear-gradient(to right, #bb268c, #f0768c)', p: 4, mt: 8, color: 'white' }}>
      <Grid container sx={{ justifyContent: { md: "center", sx: "left"} }}  spacing={5}> {/* adjust spacing here */}
        {/* Column 1: App Info */}
        <Grid
          item xs={12} sm={6} md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start", // left-align content
            pr: { md: 3}
          }}
        >
          <Typography variant="h6" gutterBottom>
            MyApp
          </Typography>
          <Typography variant="body2" gutterBottom>
            Short description of your app goes here.
          </Typography>
          <Box>
            <IconButton aria-label="facebook" size="small" sx={{ color: "white" }}>
              <Facebook />
            </IconButton>
            <IconButton aria-label="twitter" size="small" sx={{ color: "white" }}>
              <Twitter />
            </IconButton>
            <IconButton aria-label="instagram" size="small" sx={{ color: "white" }}>
              <Instagram />
            </IconButton>
            <IconButton aria-label="linkedin" size="small" sx={{ color: "white" }}>
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>

        {/* Column 2: Useful Links */}
        <Grid
          item xs={12} sm={6} md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            borderRight: { md: "2px solid white" },
            borderLeft: { md: "2px solid white" },
            px: {md: 10}
          }}
        >
          <Typography variant="h6" gutterBottom>
            Useful Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Link href="#" underline="none" color="inherit">About Us</Link>
            <Link href="#" underline="none" color="inherit">Career</Link>
            <Link href="#" underline="none" color="inherit">News & Articles</Link>
            <Link href="#" underline="none" color="inherit">Notice</Link>
          </Box>
        </Grid>

        {/* Column 3: Support */}
        <Grid
          item xs={12} sm={6} md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            borderRight: { md: "2px solid white" },
            pr: { md: 10},
            pl: { md: 5}
          }}
        >
          <Typography variant="h6" gutterBottom>
            Support
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Link href="#" underline="none" color="inherit">Help Center</Link>
            <Link href="#" underline="none" color="inherit">Contact Us</Link>
            <Link href="#" underline="none" color="inherit">FAQ</Link>
            <Link href="#" underline="none" color="inherit">Community</Link>
          </Box>
        </Grid>

        {/* Column 4: Contact Info */}
        <Grid
          item xs={12} sm={6} md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            pl: { md: 5 },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Contact Info
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Phone sx={{ mr: 1 }} /> <Typography variant="body2">+1 234 567 890</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Email sx={{ mr: 1 }} /> <Typography variant="body2">info@example.com</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocationOn sx={{ mr: 1 }} /> <Typography variant="body2">123 Main Street, City</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Full-width Divider */}
      <Box sx={{ position: "relative", mt: 3, mx: "-16px", overflow: "hidden" }}>
        <Divider
          sx={{
            borderColor: "white",
            borderWidth: 1,
            width: "calc(100% + 50px)",
          }}
        />
      </Box>

      {/* Copyright */}
      <Typography mt={3} variant="body2" color="textSecondary" align="center">
        © 2025 All rights reserved
      </Typography>
    </Box>
  );
}
